# @\_linked/org

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
