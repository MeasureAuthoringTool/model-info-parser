import Handlebars from "./registerPartials";

export const source = `
export * from "./internal";
`;

export default Handlebars.compile<void>(source);
