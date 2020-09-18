/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
  Resource,
  IDomainResource,
  IBundle,
  IResourceChild,
  IPathWithArray,
  DomainResource,
  Bundle,
  ResourceChild,
  PathWithArray,
} from "./internal";

const resourceBundle: Record<string, typeof Resource> = {
  "DomainResource": DomainResource,
  "Bundle": Bundle,
  "ResourceChild": ResourceChild,
  "PathWithArray": PathWithArray
};

export type AnyResource =
  IDomainResource |
  IBundle |
  IResourceChild |
  IPathWithArray;

export function lookupResourceType(typeName: string): typeof Resource | undefined {
  return resourceBundle[typeName];
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
