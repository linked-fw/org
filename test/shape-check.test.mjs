import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

/**
 * The package's shapes agree with its ontology data (the W3C ORG Turtle): every `extends` is
 * backed by a stated `rdfs:subClassOf`, no shape borrows a class, and every ORG term the package
 * uses is defined in that data. Runs on the build output, so it checks the shipped Turtle.
 *
 * The test loads the package and its framework dependencies the way an app does (each one's
 * `shapes/index`, which registers its ontology data as well: a dependency's shape modules alone
 * do not, and its terms would read as undefined). Findings about the dependencies' shapes belong
 * to their own packages, so only findings on this package's shapes and in its mirrored namespace
 * count here.
 */

const root = new URL('../', import.meta.url);
const pkg = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
const NS = 'http://www.w3.org/ns/org#';

await import(new URL('lib/esm/index.js', root).href);
for (const dep of Object.keys(pkg.dependencies ?? {})) {
  if (dep.startsWith('@_linked/') && dep !== '@_linked/core') await import(`${dep}/shapes/index`);
}
const {checkShapeHierarchy} = await import('@_linked/core/shapes/checkShapeHierarchy');
const {getAllNodeShapes, getShapeClass} = await import('@_linked/core/utils/ShapeClass');

const ownShape = (iri) => iri !== undefined && getShapeClass(iri)?.packageName === pkg.name;

test('the shape check reports nothing on this package', async () => {
  assert.ok([...getAllNodeShapes().keys()].some(ownShape), 'no shape of this package registered');
  const findings = (await checkShapeHierarchy()).filter(
    (f) => ownShape(f.shape) || (f.kind === 'mirror-undefined-term' && f.iri?.startsWith(NS)),
  );
  assert.deepEqual(findings, []);
});


test('Role and Membership extend no schema shape; Role keeps name on schema:name', async () => {
  const {Role} = await import(new URL('lib/esm/shapes/Role.js', root).href);
  const {Membership} = await import(new URL('lib/esm/shapes/Membership.js', root).href);
  const {Shape} = await import('@_linked/core/shapes/Shape');
  assert.equal(Object.getPrototypeOf(Role), Shape);
  assert.equal(Object.getPrototypeOf(Membership), Shape);
  const {getPropertyShapeByLabel} = await import('@_linked/core/utils/ShapeClass');
  const name = getPropertyShapeByLabel(Role, 'name');
  assert.deepEqual(name?.path, {id: 'http://schema.org/name'});
  assert.equal(name?.maxCount, 1);
});
