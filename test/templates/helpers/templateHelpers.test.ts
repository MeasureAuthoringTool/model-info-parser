import { getMongoidPrimitive, removeNamespace} from '../../../src/templates/helpers/templateHelpers';

describe('templateHelpers', () => {
  describe("getMongoidPrimitive()", () => {
    test('Should return equivalent mongoid compatible primitive', () => {
      expect(getMongoidPrimitive('string')).toEqual('String');
      expect(getMongoidPrimitive('instant')).toEqual('DateTime');
    });
  });

  describe('removeNamespace()', () => {
    test('Should return type without namespace if type is qualified with namespace', () => {
      expect(removeNamespace('FHIR.Resource')).toEqual('Resource');
      expect(removeNamespace('DomainResource')).toEqual('DomainResource');
    });
  });
});


