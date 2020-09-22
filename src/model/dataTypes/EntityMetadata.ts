export default class EntityMetadata {
  constructor(
    public readonly namespace: string,
    public readonly originalTypeName: string,
    public readonly parentTypeName: string,
    public readonly primaryCodePath: string | null = null
  ) {}

  clone(): EntityMetadata {
    return new EntityMetadata(
      this.namespace,
      this.originalTypeName,
      this.parentTypeName,
      this.primaryCodePath
    );
  }
}
