/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
  Resource,
  IDomainResource,
  IBundle,
  IResourceChild,
  IPathWithArray,
  INestedPath,
  INestedArray,
  IChoicePath,
  DomainResource,
  Bundle,
  ResourceChild,
  PathWithArray,
  NestedPath,
  NestedArray,
  ChoicePath,
} from "./internal";

const resourceBundle: Record<string, typeof Resource> = {
  "DomainResource": DomainResource,
  "Bundle": Bundle,
  "ResourceChild": ResourceChild,
  "PathWithArray": PathWithArray,
  "NestedPath": NestedPath,
  "NestedArray": NestedArray,
  "ChoicePath": ChoicePath
};

export type AnyResource =
  IDomainResource |
  IBundle |
  IResourceChild |
  IPathWithArray |
  INestedPath |
  INestedArray |
  IChoicePath;

export function lookupResourceType(typeName: string): typeof Resource | undefined {
  return resourceBundle[typeName];
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
