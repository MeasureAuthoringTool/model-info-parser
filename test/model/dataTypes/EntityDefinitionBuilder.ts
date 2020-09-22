import DataType from "../../../src/model/dataTypes/DataType";
import EntityImports from "../../../src/model/dataTypes/EntityImports";
import EntityMetadata from "../../../src/model/dataTypes/EntityMetadata";
import MemberVariable from "../../../src/model/dataTypes/MemberVariable";
import EntityDefinition from "../../../src/model/dataTypes/EntityDefinition";
import PathSegment from "../../../src/model/dataTypes/PathSegment";
import PrimaryCode from "../../../src/model/dataTypes/PrimaryCode";

export default class EntityDefinitionBuilder {
  public metadata: EntityMetadata;

  public dataType: DataType;

  public parentType: DataType | null;

  public memberVariables: Array<MemberVariable>;

  public imports: EntityImports;

  public collectionName: string | null;

  public primaryCode: PrimaryCode | null;

  constructor() {
    this.metadata = new EntityMetadata(
      "ns4",
      "Data.Type",
      "ns3.Base.Type",
      "memberTypeName1.varName1"
    );
    this.dataType = DataType.getInstance("ns4", "Data.Type", "/tmp");
    this.parentType = DataType.getInstance("ns3", "Base.Type", "/tmp");

    const memberType1 = DataType.getInstance("ns2", "memberTypeName1", "/tmp");
    const memberType2 = DataType.getInstance("ns2", "memberTypeName2", "/tmp");
    const member1 = new MemberVariable(memberType1, "varName1", false);
    const member2 = new MemberVariable(memberType2, "varName2", true);
    this.memberVariables = [member1, member2];
    this.imports = new EntityImports([memberType1, memberType2]);
    this.collectionName = null;

    const dt = DataType.getInstance("ns5", "PrimaryType", "/tmp");
    this.primaryCode = new PrimaryCode(
      [new PathSegment(dt, true, "primaryPath")],
      [dt]
    );
  }

  public buildEntityDefinition(): EntityDefinition {
    const { dataType } = this;
    return new EntityDefinition(
      this.metadata.clone(),
      dataType,
      this.parentType,
      [...this.memberVariables],
      this.imports.clone(),
      this.primaryCode,
      this.collectionName
    );
  }
}
