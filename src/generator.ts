import TypeInfo from "./model/TypeInfo";
import classTemplate from "./templates/classTemplate";
import typeAliasTemplate from "./templates/typeAliasTemplate";
import FileWriter from "./FileWriter";

export default async function (typeInfo: TypeInfo) {
  let contents;

  if (typeInfo.aliasType) {
    contents = typeAliasTemplate(typeInfo);
  } else {
    contents = classTemplate(typeInfo);
  }

  const { namespace, name } = typeInfo;
  const fileName = `${name}.ts`;

  const writer = new FileWriter(contents, namespace, fileName);
  await writer.writeFile();
  return contents;
}
