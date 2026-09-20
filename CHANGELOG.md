# @\_linked/org

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
