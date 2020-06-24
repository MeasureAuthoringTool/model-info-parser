import {exec} from 'child_process';
import MongooseTypeGenerator, {
  isDateTimeImportRequired,
  isFHIRDateImportRequired
} from "../src/generators/MongooseTypeGenerator";
import {entityCollection} from './fixture/entityCollectionMongoose.json'
import EntityCollection from "../src/model/dataTypes/EntityCollection";

describe('generateMongooseTypes', () => {
  const modelDir = './test/mongoose';
  afterAll(() => {
    exec(`rm -rf ${modelDir}`);
  });
  beforeAll(() => {
    exec(`rm -rf ${modelDir}`);
  });
  test('Should generate mongoose models successfully', async () => {
    const collection = JSON.parse(JSON.stringify(entityCollection)) as EntityCollection;
    const result = await MongooseTypeGenerator(collection);
    expect(result.length).toEqual(collection.entities.length);
    expect(result[0]).toContain('const AccountSchema = DomainResourceSchemaFunction({\n' +
      '   identifier : [IdentifierSchema],\n' +
      '   status : AccountStatusSchema,\n' +
      '   type : CodeableConceptSchema,\n' +
      '   name : String,\n' +
      '   subject : [ReferenceSchema],\n' +
      '   servicePeriod : PeriodSchema,\n' +
      '   coverage : [AccountCoverageSchema],\n' +
      '   owner : ReferenceSchema,\n' +
      '   description : String,\n' +
      '   guarantor : [AccountGuarantorSchema],\n' +
      '   partOf : ReferenceSchema,\n' +
      '   fhirTitle: { type: String, default: \'Account\' },\n' +
      '});');
    expect(result[0]).toContain('class Account extends mongoose.Document {\n' +
      '  constructor(object) {\n' +
      '    super(object, AccountSchema);\n' +
      '    this._type = \'FHIR::Account\';\n' +
      '  }\n' +
      '};');
  });
  describe("isDateTimeImportRequired", () => {
    test("positive", () => {
      expect(isDateTimeImportRequired("dateTime")).toBeTrue();
      expect(isDateTimeImportRequired("instant")).toBeTrue();
      expect(isDateTimeImportRequired("time")).toBeTrue();
    });
    test("negative", () => {
      expect(isDateTimeImportRequired("any")).toBeFalse();
    });
  });
  describe("isFHIRDateImportRequired", () => {
    test("positive", () => {
      expect(isFHIRDateImportRequired("date")).toBeTrue();
    });
    test("negative", () => {
      expect(isFHIRDateImportRequired("any")).toBeFalse();
    });
  });
});
