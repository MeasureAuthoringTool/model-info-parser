/**
 * This is the abstract parent class of all modelinfo Elements.
 * The three child types are SimpleElement, ListElement and ChoiceElement
 */
export default abstract class Element {
  protected constructor(public name: string) {}
}
