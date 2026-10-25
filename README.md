# @_linked/org

[The Organization Ontology](https://www.w3.org/TR/vocab-org/) for Linked: the ORG vocabulary as
Turtle, an accessor for every term, and the `Membership` and `Role` shapes. The package mirrors
`http://www.w3.org/ns/org#` and holds only its terms.

## Terms

```ts
import * as org from '@_linked/org/ontologies/org';

static targetClass = org.Membership;
```

`ontologies/org` has one named export per term (45); `ontologies/org.data` holds `ns`,
`dataFiles`, `_ontologyResource` and `loadData()`. `linked generate-ontology` writes the modules
from the data (`package.json` `"linkedOntologies"`), and `linked build` fails when they are stale;
never edit them by hand.

## The data

`src/data/org.ttl` is the Organization Ontology (W3C Recommendation 2014-01-16, the latest) as
the W3C publishes it, <https://www.w3.org/ns/org.ttl> (`owl:versionInfo "0.8"`, Last-Modified
2025-09-05), unchanged apart from a leading comment that names the source. To refresh, download it
with `curl -sSL https://www.w3.org/ns/org.ttl`, put the comment back with the new version, and run
`npx linked generate-ontology`.

The official files are the only source of the package's terms: the package never adds a class
or property to a standard's namespace. What the published standard lacks, mainly metadata, goes
in one extra file per prefix, `src/data/<prefix>-added.ttl`, listed in `"linkedOntologies"`' data:

- the ontology entity itself: `owl:Ontology`, title, description,
  `vann:preferredNamespacePrefix`, `vann:preferredNamespaceUri`, the source URL and version;
- annotations on terms the standard already defines, such as a missing `rdfs:label`.

New classes or properties never go there; a term a standard lacks belongs in the consumer's own
ontology package.

The official file carries its own ontology header, so this package has no `-added` file.

## Development

```bash
npx linked build    # checks the ontology modules, compiles, writes lib/esm/data/shapes.ttl
npm test            # runs against lib/
```

## Data license

The package code is MIT licensed (see `LICENSE`). The bundled ontology data is derived from the W3C Organization Ontology (https://www.w3.org/ns/org) and is not covered by the MIT license: it remains under the Open Data Commons Public Domain Dedication and License (PDDL) 1.0, https://opendatacommons.org/licenses/pddl/1-0/, as its vocabulary file declares (dct:license). See `NOTICE`.
