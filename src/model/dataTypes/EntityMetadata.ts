export default class EntityMetadata {
  constructor(
    public readonly namespace: string,
    public readonly originalTypeName: string,
    public readonly parentTypeName: string
  ) {}

  clone(): EntityMetadata {
    return new EntityMetadata(
      this.namespace,
      this.originalTypeName,
      this.parentTypeName
    );
  }
}
