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
      `module FHIR
  # fhir/account.rb
  class Account < DomainResource
    include Mongoid::Document
    field :typeName, type: String, default: 'Account'
    embeds_many :identifier, class_name: 'Identifier'
    embeds_one :status, class_name: 'AccountStatus'
    embeds_one :type, class_name: 'CodeableConcept'
    embeds_one :name, class_name: 'PrimitiveString'
    embeds_many :subject, class_name: 'Reference'
    embeds_one :servicePeriod, class_name: 'Period'
    embeds_many :coverage, class_name: 'AccountCoverage'
    embeds_one :owner, class_name: 'Reference'
    embeds_one :description, class_name: 'PrimitiveString'
    embeds_many :guarantor, class_name: 'AccountGuarantor'
    embeds_one :partOf, class_name: 'Reference'
`
    );
  });
});
