import parser from "./parser";
import TypeScriptGenerator from "./generators/TypeScriptGenerator";

/*
FHIR JSON Spec
https://www.hl7.org/fhir/DSTU2/json.html
// TODO what about Value Sets?
- Look at Address in modelinfo. It has an AddressType element (which has a value, of type string -> alias to string)
- But in the spec, you see that "type" on "Address" is defined as a "code", and seems to be a ValueSet of type AddressType
- How can you tell which of these fields reference a ValueSet?

// TODO everything should be nullable/undefined
// TODO date/dateTime/instant/time elements should probably be a string

TODO "Resource" types (top-level) will have a "resourceType" member

Also, way down the line: can we validate? (for an example, an unsigned int will be a "number" in ts)
Might need to store a static, type layout in the class definition to help with custom validation rules
(e.g. "foo is an unsigned int, bar is an "instant", etc)


// TODO system numbers should use a better "big nubmer" system like https://github.com/jtobey/javascript-bignum
// See https://www.hl7.org/fhir/json.html

// TODO what about "contextRelationship" and "context"? (I think it's like a Resource referencing another resource

 */
const main = async () => {
  const modelInfo = await parser("fhir-modelinfo-4.0.1.xml");

  const { complexTypes } = modelInfo;

  const generator = new TypeScriptGenerator();

  const promises = complexTypes.map(async (typeInfo) => {
    const generated = await generator.generate(typeInfo);
    return generated;
  });

  const generatedTypes = await Promise.all(promises);
};

main()
  .then((result) => {
    console.log("Done");
  })
  .catch((err) => {
    console.error("ERROR");
    console.error(err);
  });
