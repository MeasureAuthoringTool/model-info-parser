import TypeInfo from "../model/TypeInfo";

type IGenerator = (
  typeInfoIn: TypeInfo,
  baseDirectory: string
) => Promise<string>;

export default IGenerator;
