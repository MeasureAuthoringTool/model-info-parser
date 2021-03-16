/* eslint-disable import/prefer-default-export, import/no-cycle */
import {
  AddressType,
  BackboneElement,
  Resource,
  DomainResource,
  ResourceChild,
  Bundle,
  BundleEntry,
  Extension,
  KitchenSink,
  Coding,
  CodeableConcept,
  Element,
  PathWithArray,
  NestedPath,
  NestedArray,
  ChoicePath,
  Quantity,
  QuantityComparator,
  SimpleQuantity,
  PrimitiveBase64Binary,
  PrimitiveBoolean,
  PrimitiveCanonical,
  PrimitiveCode,
  PrimitiveDate,
  PrimitiveDateTime,
  PrimitiveDecimal,
  PrimitiveId,
  PrimitiveInstant,
  PrimitiveInteger,
  PrimitiveMarkdown,
  PrimitiveOid,
  PrimitivePositiveInt,
  PrimitiveQuestion,
  PrimitiveString,
  PrimitiveTime,
  PrimitiveUnsignedInt,
  PrimitiveUri,
  PrimitiveUrl,
  PrimitiveUuid,
  PrimitiveXhtml,
  Type,
} from "./internal";

const typeMapping: Record<string, typeof Type> = {
  "AddressType": AddressType,
  "BackboneElement": BackboneElement,
  "Resource": Resource,
  "DomainResource": DomainResource,
  "ResourceChild": ResourceChild,
  "Bundle": Bundle,
  "BundleEntry": BundleEntry,
  "Extension": Extension,
  "KitchenSink": KitchenSink,
  "Coding": Coding,
  "CodeableConcept": CodeableConcept,
  "Element": Element,
  "PathWithArray": PathWithArray,
  "NestedPath": NestedPath,
  "NestedArray": NestedArray,
  "ChoicePath": ChoicePath,
  "Quantity": Quantity,
  "QuantityComparator": QuantityComparator,
  "SimpleQuantity": SimpleQuantity,
  "PrimitiveBase64Binary": PrimitiveBase64Binary,
  "PrimitiveBoolean": PrimitiveBoolean,
  "PrimitiveCanonical": PrimitiveCanonical,
  "PrimitiveCode": PrimitiveCode,
  "PrimitiveDate": PrimitiveDate,
  "PrimitiveDateTime": PrimitiveDateTime,
  "PrimitiveDecimal": PrimitiveDecimal,
  "PrimitiveId": PrimitiveId,
  "PrimitiveInstant": PrimitiveInstant,
  "PrimitiveInteger": PrimitiveInteger,
  "PrimitiveMarkdown": PrimitiveMarkdown,
  "PrimitiveOid": PrimitiveOid,
  "PrimitivePositiveInt": PrimitivePositiveInt,
  "PrimitiveQuestion": PrimitiveQuestion,
  "PrimitiveString": PrimitiveString,
  "PrimitiveTime": PrimitiveTime,
  "PrimitiveUnsignedInt": PrimitiveUnsignedInt,
  "PrimitiveUri": PrimitiveUri,
  "PrimitiveUrl": PrimitiveUrl,
  "PrimitiveUuid": PrimitiveUuid,
  "PrimitiveXhtml": PrimitiveXhtml,
  "Type": Type
};

export const allTypeNames = [
  "AddressType",
  "BackboneElement",
  "Resource",
  "DomainResource",
  "ResourceChild",
  "Bundle",
  "BundleEntry",
  "Extension",
  "KitchenSink",
  "Coding",
  "CodeableConcept",
  "Element",
  "PathWithArray",
  "NestedPath",
  "NestedArray",
  "ChoicePath",
  "Quantity",
  "QuantityComparator",
  "SimpleQuantity",
  "PrimitiveBase64Binary",
  "PrimitiveBoolean",
  "PrimitiveCanonical",
  "PrimitiveCode",
  "PrimitiveDate",
  "PrimitiveDateTime",
  "PrimitiveDecimal",
  "PrimitiveId",
  "PrimitiveInstant",
  "PrimitiveInteger",
  "PrimitiveMarkdown",
  "PrimitiveOid",
  "PrimitivePositiveInt",
  "PrimitiveQuestion",
  "PrimitiveString",
  "PrimitiveTime",
  "PrimitiveUnsignedInt",
  "PrimitiveUri",
  "PrimitiveUrl",
  "PrimitiveUuid",
  "PrimitiveXhtml",
  "Type"
] as const;

type TypeNames = typeof allTypeNames;
export type TypeName = TypeNames[number];

export function lookupType(typeName: string): typeof Type | undefined {
  return typeMapping[typeName];
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
