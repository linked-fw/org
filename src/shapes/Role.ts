import {literalProperty} from '@_linked/core/shapes/SHACL';
import {Shape} from '@_linked/core/shapes/Shape';
import {schema} from '@_linked/schema/ontologies/schema';
import {linkedShape} from '../package.js';
import {org} from '../ontologies/org.js';

/**
 * `org:Role`. ORG does not make it a subclass of `schema:Thing`, so the shape does not extend
 * schema's `Thing`; it declares the one Thing property its consumers read, on the same path.
 */
@linkedShape
export class Role extends Shape {
  static targetClass = org.Role;

  /** The role's name (`schema:name`); applications read it to decide what a member may do. */
  @literalProperty({
    path: schema.name,
    maxCount: 1,
  })
  get name(): string {
    return '';
  }
}
