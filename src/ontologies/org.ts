import type {NodeReferenceValue} from '@_linked/core/utils/NodeReference';
import {createNameSpace} from '@_linked/core/utils/NameSpace';
import {loadOntologyFiles} from '@_linked/core/ontology/loadOntologyFiles';

/** The package's ontology data, relative to this module: the W3C ORG Turtle, unedited (copied into `lib/` by the build). */
export const dataFiles = ['../data/org.ttl'];

/** Reads the package's ontology data (server only). */
export const loadData = () => loadOntologyFiles(import.meta.url, dataFiles);

/**
 * The namespace of this ontology, which can be used to create NamedNodes with URI's not listed in this file
 */
export var ns = createNameSpace('http://www.w3.org/ns/org#');

/**
 * The NamedNode of the ontology itself
 */
export var _self: NodeReferenceValue = ns('');

//A list of all the entities (Classes & Properties) of this ontology, each exported as a NamedNode
export var Membership: NodeReferenceValue = ns('Membership');
export var Role: NodeReferenceValue = ns('Role');
export var hasMembership: NodeReferenceValue = ns('hasMembership');
export var Organization: NodeReferenceValue = ns('Organization');
export var organization: NodeReferenceValue = ns('organization');
export var member: NodeReferenceValue = ns('member');
export var role: NodeReferenceValue = ns('role');

//An extra grouping object so all the entities can be accessed from the prefix/name
export const org = {
  Membership,
  Role,
  hasMembership,
  Organization,
  organization,
  member,
  role
};

