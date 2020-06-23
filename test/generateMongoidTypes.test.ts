import { exec } from "child_process";
import MongoidTypeGenerator from "../src/generators/MongoidTypeGenerator";
import { entityCollection } from "./fixture/entityCollection.json";
import EntityCollection from "../src/model/dataTypes/EntityCollection";

describe("generateMongoidTypes", () => {
  const modelDir = "./test/mongoid";
  afterAll(() => {
    exec(`rm -rf ${modelDir}`);
  });

  test("Should generate mongoid models successfully", async () => {
    const collection = JSON.parse(
      JSON.stringify(entityCollection)
    ) as EntityCollection;
    const result = await MongoidTypeGenerator(collection);
    expect(result.length).toEqual(collection.entities.length);
    expect(result[0]).toContain(
      "module FHIR\n" +
        "  # FHIR/Account.rb\n" +
        "  class Account < DomainResource\n" +
        "    include Mongoid::Document\n" +
        "    field :typeName, type: String, default: 'Account'\n" +
        "    embeds_many :identifier, class_name: 'Identifier'\n" +
        "    embeds_one :status, class_name: 'AccountStatus'\n" +
        "    embeds_one :type, class_name: 'CodeableConcept'\n" +
        "    field :name, type: String\n" +
        "    embeds_many :subject, class_name: 'Reference'\n" +
        "    embeds_one :servicePeriod, class_name: 'Period'\n" +
        "    embeds_many :coverage, class_name: 'AccountCoverage'\n" +
        "    embeds_one :owner, class_name: 'Reference'\n" +
        "    field :description, type: String\n" +
        "    embeds_many :guarantor, class_name: 'AccountGuarantor'\n" +
        "    embeds_one :partOf, class_name: 'Reference'\n" +
        "  end\n"
    );
  });
});
