import { Organization } from '@_linked/schema/shapes/Organization';
import { Person } from '@_linked/schema/shapes/Person';
import { ShapeSet } from '@_linked/core/collections/ShapeSet';
import { Shape } from '@_linked/core/shapes/Shape';
import { shacl } from '@_linked/core/ontologies/shacl';
import { createPropertyShape, objectProperty } from '@_linked/core/shapes/SHACL';
import * as org from '../ontologies/org.js';
import { linkedShape } from '../package.js';
import { Role } from './Role.js';

/**
 * `org:Membership`: a person's membership of an organization, in a role. ORG gives the class no
 * superclass, so the shape extends no schema shape.
 */
@linkedShape
export class Membership extends Shape {
  static targetClass = org.Membership;

  @objectProperty({
    path: org.member,
    shape: Person,
    maxCount: 1,
  })
  get member(): Person {
    return undefined as any;
  }

  @objectProperty({
    path: org.role,
    shape: Role,
    maxCount: 1,
  })
  get role(): Role {
    return undefined as any;
  }

  @objectProperty({
    path: org.organization,
    shape: Organization,
    maxCount: 1,
  })
  get organization(): Organization {
    return undefined as any;
  }
}

//Support person.memberships in queries
createPropertyShape(
  {
    path: org.hasMembership,
    shape: Membership,
  },
  'memberships',
  shacl.IRI,
  Person
);
declare module '@_linked/schema/shapes/Person' {
  interface Person {
    readonly memberships: ShapeSet<Membership>;
  }
}

// A person → organization sequence path (org:hasMembership / org:organization) is now
// resolvable by core (plan-012), but Workspace-by-member queries use the inverse
// `Workspace.memberships` ({inv: org.organization}) instead, so no `Person.organizations`
// property is needed here. Add one if a forward person→orgs traversal is wanted:
//   createPropertyShape({path: [org.hasMembership, org.organization], shape: Organization},
//     'organizations', shacl.IRI, Person);
