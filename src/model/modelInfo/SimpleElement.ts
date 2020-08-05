import Element from "./Element";

/**
 * This represents one of the three "Element" XML elements under a modelinfo TypeInfo.
 * This is the simplest type of Element (the others being a ChoiceElement and a ListElement).
 * For example:
 * <ns4:element name="title" elementType="FHIR.string"/>
 */
export default class SimpleElement extends Element {
  constructor(
    public name: string,
    public namespace: string,
    public typeName: string
  ) {
    super(name);
  }
}
