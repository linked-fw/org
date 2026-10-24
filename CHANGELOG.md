# @\_linked/org

## 1.3.1

### Patch Changes

- [#49](https://github.com/linked-fw/org/pull/49) [`c6bfeb2`](https://github.com/linked-fw/org/commit/c6bfeb2bd8567d67b120953405b094034b73238e) Thanks [@flyon](https://github.com/flyon)! - Ships `lib/esm/data/shapes.ttl`; core range raised.

## 1.3.0

### Minor Changes

- [`faac046`](https://github.com/linked-fw/org/commit/faac04664fb26fc49ab06e34614725d6e1ecee26) Thanks [@flyon](https://github.com/flyon)! - The package ships the W3C Organization Ontology as its ontology data, and its shapes follow that vocabulary's class hierarchy.
  
  **Breaking: `Role` and `Membership` no longer extend `@_linked/schema`'s `Thing`.** ORG does not make `org:Role` or `org:Membership` a subclass of `schema:Thing`, and a shape's `extends` must agree with the class hierarchy (core's shape check). Both now extend core's `Shape`:
  
  - `Role` keeps `name` (path `schema:name`, `maxCount 1`), which applications read to decide what a member may do. Stored data and queries that select `role.name` are unchanged.
  - `Role` loses the rest of `Thing`'s accessors: `description`, `alternateName`, `disambiguatingDescription`, `identifier`, `url`, `additionalType`, owned `image`, and the getters `mainEntityOfPage`, `sameAs`, `subjectOf`.
  - `Membership` loses every `Thing` accessor: `name`, `description`, `alternateName`, `disambiguatingDescription`, `identifier`, `url`, `additionalType`, owned `image`, `mainEntityOfPage`, `sameAs`, `subjectOf`. It keeps `member`, `role` and `organization`, and `Person.memberships`.
  - `instanceof Thing` is false for both.
  
  Data stored under those paths stays in the store; read it through a shape that declares the property.
  
  Also:
  
  - `src/data/org.ttl` is `https://www.w3.org/ns/org.ttl` unedited (v0.8, PDDL), copied into `lib/esm/data/` by the build. `loadData()` resolves to the Turtle text (`string[]`, through `@_linked/core`'s `loadOntologyFiles`) instead of an empty JSON-LD document; the new `dataFiles` export names the files. Its `rdfs:subClassOf` axioms (among them `org:Organization` ⊑ `foaf:Agent`, `org:FormalOrganization` ⊑ `org:Organization`, `foaf:Organization`, and `gr:BusinessEntity` ⊑ `org:FormalOrganization`) reach every app dataset through core's ontology sync.
  - The package declares that it mirrors `http://www.w3.org/ns/org#`, so the shape check reports any ORG term a shape or export uses that the W3C data does not define.
  - `src/data/org.json` and the unused `src/shapes/Organization.ts.old` are removed.

## 1.2.5

### Patch Changes

- [#42](https://github.com/linked-fw/org/pull/42) [`ec34902`](https://github.com/linked-fw/org/commit/ec349026117ad39e2c046fe18d6ff7e0dc163bbb) Thanks [@flyon](https://github.com/flyon)! - Build with `linked build` instead of a hand-rolled `tsc` + `copyfiles` script, and drop the `rimraf`/`copyfiles` devDependencies. The published `lib/` output is unchanged.

## 1.2.4

### Patch Changes

- [#39](https://github.com/linked-fw/org/pull/39) [`5676b74`](https://github.com/linked-fw/org/commit/5676b74973d673cce37298d9be789e68a20d0b8a) Thanks [@flyon](https://github.com/flyon)! - Publish only the files consumers need; the tarball no longer includes `.changeset/`, `.gitattributes`, `.github/`, `renovate.json`, `test/` or tsconfig files.

## 1.2.3

### Patch Changes

- [#35](https://github.com/linked-fw/org/pull/35) [`ffa0a99`](https://github.com/linked-fw/org/commit/ffa0a99c529a4ee460114c9615c2cd8bed47fb3e) Thanks [@flyon](https://github.com/flyon)! - The ontology data file no longer declares the legacy `lincd-org` prefix
  (`http://lincd.org/ont/lincd-org/`). No term used it — this package wraps the external W3C
  vocabulary at `http://www.w3.org/ns/org#`, and every term IRI stays exactly as it was. The
  file's `@context` now declares the `org` prefix instead, matching the prefix the ontology is
  registered under, and the file is renamed `data/lincd-org.json` → `data/org.json`.
  
  Patch rather than minor: no term IRI changes, and the data file was never an importable
  subpath (the package's `exports` map only resolves `.js` modules), so nothing that consumers
  can reach is removed. Stored data that used the `http://lincd.org/ont/lincd-org/` namespace is
  not migrated; there is none in practice, but clear dev datasets if in doubt.
  
  Also adds `npm test` (node's built-in runner, against the built `lib/`), asserting the
  namespace and the absence of the legacy prefix.

## 1.2.2

### Patch Changes

- [#27](https://github.com/linked-fw/org/pull/27) [`9aa7b91`](https://github.com/linked-fw/org/commit/9aa7b91f94f5063fe970fde0d945b3ec2c2c209a) Thanks [@flyon](https://github.com/flyon)! - Add `shapes/index`, a side-effect-only module that registers every shape this package defines and nothing else (no components, no CSS), so `import '@_linked/org/shapes/index'` loads the shapes in plain node as well as in a bundle. The package entry now imports it instead of listing shapes one by one.

## 1.2.1

### Patch Changes

- [#19](https://github.com/linked-fw/org/pull/19) [`ed27d6e`](https://github.com/linked-fw/org/commit/ed27d6e31801810b50d60c973602b92950338287) Thanks [@flyon](https://github.com/flyon)! - Sourcemaps now embed their TypeScript source, so consumers no longer see 'points to missing source files' warnings.

## 1.2.0

### Minor Changes

- [#16](https://github.com/linked-fw/org/pull/16) [`6289590`](https://github.com/linked-fw/org/commit/6289590b39d9b9370e882e4bca19942bd6639af6) Thanks [@flyon](https://github.com/flyon)! - Require `@_linked/core@^2.22.8` (was `^2.21.0`), and pin it in the lockfile.

  The declared range was wide enough that the resolved core depended on whatever the
  consumer — or this repo's own CI, via `package-lock.json` — happened to install. Core
  decides how a shape's IRI is minted, so a stale core made this package emit legacy
  `data.lincd.org` IRIs instead of the arch-02 `linked.cm` scheme. Which IRIs a published
  package produces should not be a function of the installer's dependency tree.

  Minor rather than patch: this raises the minimum core a consumer must resolve, so it
  changes what gets installed rather than only what this package does internally.

### Patch Changes

- [#15](https://github.com/linked-fw/org/pull/15) [`1343103`](https://github.com/linked-fw/org/commit/1343103510190d72a587d6316f1087fb0ce5462c) Thanks [@flyon](https://github.com/flyon)! - The ontology no longer registers by importing itself.

  It carried `import * as _this from './<prefix>.js'` and passed that namespace to
  `linkedOntology()`. Under `tsc` the self-reference survives; under a bundler it does
  not — Rollup treats it as a circular import and elides it, so the binding is
  `undefined` and a consuming app dies at boot with `_this is not defined`.

  Registration now lives in a `<prefix>.register.ts` sibling, imported from the package
  entry. Nothing changes for consumers: importing this package still registers the
  ontology.

## 1.1.2

### Patch Changes

- [#13](https://github.com/linked-fw/org/pull/13) [`3aac60a`](https://github.com/linked-fw/org/commit/3aac60ac4479c374a3a0d6d090b7222fdca52a22) Thanks [@flyon](https://github.com/flyon)! - Compile the whole `src` folder, and let a bare import resolve under Node10.

  The build only emitted what an entry transitively reached, so any module
  nothing imported was never built — and never type-checked, so it rotted
  quietly. `include` now covers `src/**/*` with tests excluded explicitly.

  `typesVersions` maps every specifier through `lib/esm/*`, so a `types` value
  that already carried that prefix had it applied twice and no consumer on
  classic Node10 resolution could `import` the package by its bare name.

## 1.1.1

### Patch Changes

- [#10](https://github.com/linked-fw/org/pull/10) [`21fbfed`](https://github.com/linked-fw/org/commit/21fbfedb722c8b70697fc645f98e11cd2fd2ff58) Thanks [@flyon](https://github.com/flyon)! - Declare npm as the package manager for this repo, convert the build scripts off `yarn`, and mark `package-lock.json` as a generated file.

## 1.1.0

### Minor Changes

- [`ddadf2b`](https://github.com/linked-cm/org/commit/ddadf2b9da9a5f91afad763ac9bd6c89e0cdec9e) - ESM-only. Dropped the CommonJS build; ships ES modules only (`type: module`, no `require` export condition, no `lib/cjs`). Fixed the root `types` field. CJS consumers on Node 22+ can `require()` it (sync ESM) or use dynamic `import()`.

## 1.0.2

### Patch Changes

- [#3](https://github.com/linked-cm/org/pull/3) [`997ce76`](https://github.com/linked-cm/org/commit/997ce7647c5d194193d6d0e85d9d731b5ab26498) Thanks [@flyon](https://github.com/flyon)! - loadData: ESM-only JSON import — drop the dead CJS branch, add the `{ with: { type: 'json' } }` import attribute.

## 1.0.1

### Patch Changes

- [`c8ce0ab`](https://github.com/linked-cm/org/commit/c8ce0ab6039807fbb5347a5aa57825e2a4b02487) - Initial release under the new publishing setup.
