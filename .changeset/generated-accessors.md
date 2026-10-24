---
"@_linked/org": minor
---

The `org` accessor modules are generated from `src/data/org.ttl` by `linked generate-ontology`
(`package.json` `"linkedOntologies"`), and `linked build` fails when they are stale.
`ontologies/org` exports one named term for each of the 45 subjects of the namespace (up from 7).
`src/data/org.ttl` is the W3C's published Turtle, with a comment naming the source; a new README
records it and the `-added` convention.

Breaking changes:

- The aggregated `org` object is gone. Import the module as a namespace:

  ```ts
  import * as org from '@_linked/org/ontologies/org';
  static targetClass = org.Membership;
  ```

- `ns`, `dataFiles` and `loadData` moved to `@_linked/org/ontologies/org.data`; `_self` is now
  `_ontologyResource` there. `import * as org` no longer reaches them, and the registered ontology
  carries only its terms.
- The shapes import `@_linked/schema` 1.8's namespace module. Requires `@_linked/core` ^2.41.0
  and `@_linked/schema` ^1.8.0.
- No terms were renamed.
