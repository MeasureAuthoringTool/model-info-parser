import DataType from "./dataTypes/DataType";

/**
 * The type of the internal map used to represent the hierarchy.
 * The key is {{namespace}}.{{typeName}} of a type. The value is a Set of
 * its children
 */
interface HierarchyMap {
  [key: string]: Set<DataType>;
}

/**
 * This class aims to represent a hierarchy of types defined in a modelinfo file.
 *
 * Sometimes we want to know things like "what are all the types that extend from Resource?"
 * This helps us figure that out.
 */
export default class TypeHierarchy {
  public typeMap: HierarchyMap = {};

  static buildKey(type: DataType): string {
    return `${type.namespace}.${type.typeName}`;
  }

  public addType(type: DataType, parent: DataType | null): void {
    const key = TypeHierarchy.buildKey(type);

    // Add new type if it doesn't already exist
    if (!this.typeMap[key]) {
      this.typeMap[key] = new Set<DataType>();
    }

    if (parent) {
      const parentKey = TypeHierarchy.buildKey(parent);

      let children = this.typeMap[parentKey];

      // Register parent if not already present
      if (!children) {
        children = new Set<DataType>();
        this.typeMap[parentKey] = children;
      }

      children.add(type);
    }
  }

  /**
   * Recursively gather all the children for a given type
   * @param type
   */
  public getAllChildrenFor(type: DataType): Array<DataType> {
    const key = TypeHierarchy.buildKey(type);
    const immediateChildren = this.typeMap[key] || new Set();
    let result: Array<DataType> = Array.from(immediateChildren);

    immediateChildren.forEach((child) => {
      const grandChildren = this.getAllChildrenFor(child);
      result = [...result, ...grandChildren];
    });

    return result;
  }
}
