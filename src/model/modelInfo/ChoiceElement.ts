import Element from "./Element";

/**
 * This represents a namespace/name combination.
 * In actuality, the namespace is actually referred to as "modelName" in the XML
 */
export interface ChoiceType {
  typeName: string;
  namespace: string;
}

/**
 * This represents one of the three "Element" XML elements under a modelinfo TypeInfo.
 * This Element type indicates that there are a number of valid type options for this property.
 * The end result is that the JSON must accept every possible option
 * The other forms of Element are ListElement and SimpleElement).
 * For example:
 * <ns4:element name="subject">
 *   <ns4:elementTypeSpecifier xsi:type="ns4:ChoiceTypeSpecifier">
 *     <ns4:choice xsi:type="ns4:NamedTypeSpecifier" modelName="FHIR" name="CodeableConcept"/>
 *     <ns4:choice xsi:type="ns4:NamedTypeSpecifier" modelName="FHIR" name="Reference"/>
 *   </ns4:elementTypeSpecifier>
 * </ns4:element>
 */
export default class ChoiceElement extends Element {
  constructor(public name: string, public choices: Array<ChoiceType>) {
    super(name);
  }
}
