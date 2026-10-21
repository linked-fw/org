---
'@_linked/org': major
---

The package ships the W3C Organization Ontology as its ontology data, and its shapes follow that vocabulary's class hierarchy.

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
