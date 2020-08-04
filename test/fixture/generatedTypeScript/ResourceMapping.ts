/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
  Resource,
  IResourceChild,
  IBundle,
  ResourceChild,
  Bundle,
} from "./internal";

const resourceBundle: Record<string, typeof Resource> = {
  "ResourceChild": ResourceChild,
  "Bundle": Bundle
};

export type AnyResource =
  IResourceChild |
  IBundle;

export function lookupResourceType(typeName: string): typeof Resource | undefined {
  return resourceBundle[typeName];
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
