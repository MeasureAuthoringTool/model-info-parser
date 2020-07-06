import { exec } from "child_process";
import MongooseTypeGenerator from "../src/generators/MongooseTypeGenerator";
import { entityCollection } from "./fixture/entityCollectionMongoose.json";
import EntityCollection from "../src/model/dataTypes/EntityCollection";

describe("generateMongooseTypes", () => {
  const modelDir = "./test/mongoose";
  afterAll(() => {
    exec(`rm -rf ${modelDir}`);
  });
  beforeAll(() => {
    exec(`rm -rf ${modelDir}`);
  });
  test("Should generate mongoose models successfully", async () => {
    const collection = JSON.parse(
      JSON.stringify(entityCollection)
    ) as EntityCollection;
    const result = await MongooseTypeGenerator(collection);
    expect(result.length).toEqual(collection.entities.length);
    expect(result[0]).toContain("AccountSchema.add(DomainResourceSchema);");
    expect(result[0]).toContain("AccountSchema.remove('id');");
    expect(result[0]).toContain(
      "AccountSchema.add({\n" +
        "  identifier: [IdentifierSchema],\n" +
        "  status: AccountStatusSchema,\n" +
        "  type: CodeableConceptSchema,\n" +
        "  name: PrimitiveStringSchema,\n" +
        "  subject: [ReferenceSchema],\n" +
        "  servicePeriod: PeriodSchema,\n" +
        "  coverage: [AccountCoverageSchema],\n" +
        "  owner: ReferenceSchema,\n" +
        "  description: PrimitiveStringSchema,\n" +
        "  guarantor: [AccountGuarantorSchema],\n" +
        "  partOf: ReferenceSchema,\n" +
        "});"
    );
  });
});
