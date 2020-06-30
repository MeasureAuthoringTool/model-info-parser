import {exec} from 'child_process';
import MongooseTypeGenerator from "../src/generators/MongooseTypeGenerator";
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
    expect(result[0]).toContain('class Account extends mongoose.Document {\n' +
      '  constructor(object) {\n' +
      '    super(object, AccountSchema);\n' +
      '    this.typeName = \'Account\';\n' +
      '    this._type = \'FHIR::Account\';\n' +
      '  }\n' +
      '}');
    expect(result[0]).toContain('const AccountSchema = DomainResourceSchemaFunction({\n' +
      '  identifier: [IdentifierSchema],\n' +
      '  status: AccountStatusSchema,\n' +
      '  type: CodeableConceptSchema,\n' +
      '  name: PrimitiveStringSchema,\n' +
      '  subject: [ReferenceSchema],\n' +
      '  servicePeriod: PeriodSchema,\n' +
      '  coverage: [AccountCoverageSchema],\n' +
      '  owner: ReferenceSchema,\n' +
      '  description: PrimitiveStringSchema,\n' +
      '  guarantor: [AccountGuarantorSchema],\n' +
      '  partOf: ReferenceSchema,\n' +
      '  typeName: { type: String, default: \'Account\' },\n' +
      '  _type: { type: String, default: \'FHIR::Account\' },\n' +
      '});');
  });
});
