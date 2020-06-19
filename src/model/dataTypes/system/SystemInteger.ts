import DataType from "../DataType";

// TODO this should use a better "big nubmer" system like https://github.com/jtobey/javascript-bignum
// See https://www.hl7.org/fhir/json.html
export default DataType.getInstance("System", "number", `${__dirname}/system`);
