// Runs against the built output (lib/esm), so build first: `npm run build && npm test`.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync} from 'node:fs';
import {hierarchyFromTurtle} from '@_linked/core/ontology/hierarchy';
import {dataFiles, loadData, ns} from '../lib/esm/ontologies/org.js';

const ORG = 'http://www.w3.org/ns/org#';

test('ontology wraps the W3C org vocabulary', () => {
  assert.equal(ns('Role').id, `${ORG}Role`);
  assert.deepEqual(dataFiles, ['../data/org.ttl']);
});

test('ontology data is the W3C ORG Turtle, with no legacy lincd.org IRI', async () => {
  const [text, ...rest] = await loadData();
  assert.equal(rest.length, 0);
  assert.match(text, /@prefix org:\s+<http:\/\/www\.w3\.org\/ns\/org#>/);
  assert.ok(!text.includes('lincd.org'), 'no lincd.org IRI in ontology data');
});

test('ontology data holds the ORG class hierarchy', async () => {
  const triples = await hierarchyFromTurtle(await loadData());
  assert.deepEqual(
    triples.map(({s, o}) => `${s} ${o}`),
    [
      `http://purl.org/goodrelations/v1#BusinessEntity ${ORG}FormalOrganization`,
      `${ORG}ChangeEvent http://www.w3.org/ns/prov#Activity`,
      `${ORG}FormalOrganization ${ORG}Organization`,
      `${ORG}FormalOrganization http://xmlns.com/foaf/0.1/Organization`,
      `${ORG}Organization http://xmlns.com/foaf/0.1/Agent`,
      `${ORG}OrganizationalCollaboration ${ORG}Organization`,
      `${ORG}OrganizationalUnit ${ORG}Organization`,
      `${ORG}Role http://www.w3.org/2004/02/skos/core#Concept`,
    ],
  );
});

test('no leftover sources in the shapes folder', () => {
  const shapes = readdirSync(new URL('../src/shapes/', import.meta.url));
  assert.deepEqual(shapes.filter((f) => f.endsWith('.old')), []);
});
