/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
  Resource,
  IDomainResource,
  IResourceChild,
  IBundle,
  DomainResource,
  ResourceChild,
  Bundle,
} from "./internal";

const resourceBundle: Record<string, typeof Resource> = {
  "DomainResource": DomainResource,
  "ResourceChild": ResourceChild,
  "Bundle": Bundle
};

export type AnyResource =
  IDomainResource |
  IResourceChild |
  IBundle;

export function lookupResourceType(typeName: string): typeof Resource | undefined {
  return resourceBundle[typeName];
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
