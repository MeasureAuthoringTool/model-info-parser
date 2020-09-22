import DataType from "../../src/model/dataTypes/DataType";
import EntityImports from "../../src/model/dataTypes/EntityImports";
import EntityDefinition from "../../src/model/dataTypes/EntityDefinition";
import EntityMetadata from "../../src/model/dataTypes/EntityMetadata";
import MemberVariable from "../../src/model/dataTypes/MemberVariable";
import ExtractDataTypeTransformer from "../../src/collectionUtils/ExtractDataTypeTransformer";

describe("ExtractDataTypeTransformer", () => {
  it("should return the DataType for a given EntityDefinition", () => {
    const dataType = DataType.getInstance("ns", "Type", "/tmp");
    const memberType1 = DataType.getInstance("ns2", "memberTypeName1", "/tmp");
    const metadata = new EntityMetadata("ns4", "Data.Type", "ns3.Base.Type");
    const member1 = new MemberVariable(memberType1, "varName1", false);
    const members = [member1];
    const imports = new EntityImports([memberType1]);
    const entityDef = new EntityDefinition(
      metadata,
      dataType,
      null,
      members,
      imports,
      null
    );
    const transformer = new ExtractDataTypeTransformer();
    const result: DataType = transformer.transform(entityDef);
    expect(result).toBe(dataType);
  });
});
