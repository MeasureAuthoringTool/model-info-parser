import ComplexDataType from "./dataTypes/ComplexDataType";

/**
 * The type of the internal map used to represent the hierarchy.
 * The key is {{namespace}}.{{typeName}} of a type. The value is a Set of
 * its children
 */
type HierarchyMap = {
  [key: string]: Set<ComplexDataType>;
};

/**
 * This class aims to represent a hierarchy of types defined in a modelinfo file.
 *
 * Sometimes we want to know things like "what are all the types that extend from Resource?"
 * This helps us figure that out.
 */
export default class TypeHierarchy {
  public typeMap: HierarchyMap = {};

  static buildKey(type: ComplexDataType): string {
    return `${type.namespace}.${type.typeName}`;
  }

  public addType(type: ComplexDataType, parent: ComplexDataType|null) {
    const key = TypeHierarchy.buildKey(type);

    // Add new type if it doesn't already exist
    if (!this.typeMap[key]) {
      this.typeMap[key] = new Set<ComplexDataType>();
    }

    if (parent) {
      const parentKey = TypeHierarchy.buildKey(parent);

      let children = this.typeMap[parentKey];

      // Register parent if not already present
      if (!children) {
        children = new Set<ComplexDataType>();
        this.typeMap[parentKey] = children;
      }

      children.add(type);
    }
  }

  /**
   * Recursively gather all the children for a given type
   * @param type
   */
  public getAllChildrenFor(type: ComplexDataType): Array<ComplexDataType> {
    const key = TypeHierarchy.buildKey(type);
    const immediateChildren = this.typeMap[key] || new Set();
    let result: Array<ComplexDataType> = Array.from(immediateChildren);

    immediateChildren.forEach((child) => {
      const grandChildren = this.getAllChildrenFor(child);
      result = [...result, ...grandChildren];
    });

    return result;
  }
}
