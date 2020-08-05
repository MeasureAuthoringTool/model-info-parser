import Element from "./Element";

/**
 * This represents one of the three "Element" XML elements under a modelinfo TypeInfo.
 * This Element type indicates that there should be an Array of this particular type in the owning TypeInfo
 * The other forms of Element are ChoiceElement and SimpleElement).
 * For example:
 * <ns4:element name="identifier">
 *   <ns4:elementTypeSpecifier xsi:type="ns4:ListTypeSpecifier" elementType="FHIR.Identifier"/>
 * </ns4:element>
 */
export default class ListElement extends Element {
  constructor(
    public name: string,
    public namespace: string,
    public typeName: string
  ) {
    super(name);
  }
}
