import MemberVariable from "../../../model/dataTypes/MemberVariable";
import Handlebars from "../registerPartials";
import DataType from "../../../model/dataTypes/DataType";
import EntityMetadata from "../../../model/dataTypes/EntityMetadata";
import EntityImports from "../../../model/dataTypes/EntityImports";
import PrimaryCode from "../../../model/dataTypes/PrimaryCode";

export const source = `/* eslint-disable import/prefer-default-export, import/no-cycle */
{{# if imports.dataTypes }}import {
{{# if (eq dataType.normalizedName "Resource") }}
  lookupResourceType,
{{/ if }}
{{# if (eq dataType.normalizedName "Type") }}
  getFieldList,
  getTypeName,
  getParentTypeName,
  getFieldInfo,
  lookupType,
  FieldMetadata,
{{/ if }}
{{# each imports.dataTypes }}
  {{ this.normalizedName }},
{{/ each }}
  FhirType
} from "../internal";

{{/ if }}
@FhirType("{{ dataType.normalizedName }}"{{# if parentDataType }}, "{{ parentDataType.normalizedName }}"{{/ if }})
export class {{ dataType.normalizedName }}{{# if parentDataType }} extends {{ parentDataType.normalizedName }}{{/ if }} {
  static readonly baseType: string = "{{ metadata.parentTypeName }}";

  static readonly namespace: string = "{{ metadata.namespace }}";

  static readonly typeName: string = "{{ metadata.originalTypeName }}";

  static readonly primaryCodePath: string | null = {{# if metadata.primaryCodePath ~}}
    "{{ metadata.primaryCodePath }}"
  {{~ else ~}}
    null
  {{~/ if }};

  {{# if (eq dataType.normalizedName "Type") }}
  static get fieldList(): ReadonlyArray<string> {
    return getFieldList(this.prototype);
  }

  static get parentType(): typeof Type | null {
    const parentTypeName = getParentTypeName(this.prototype) || "";
    const parentTypeRef = lookupType(parentTypeName);
    return parentTypeRef || null;
  }

  get fhirTypeRef(): typeof Type {
    const typeName = getTypeName(this) || "";
    const typeRef = lookupType(typeName);
    if (!typeRef) {
      throw new Error("Cannot find name of FHIR type");
    }
    return typeRef;
  }

  static get fieldInfo(): ReadonlyArray<FieldMetadata> {
    const result = this.fieldList.map((fieldName) => {
      const fieldMetadata = getFieldInfo(this.prototype, fieldName);
      if (!fieldMetadata) {
        throw new Error(\`Cannot find metadata for field \${fieldName}\`);
      }
      return fieldMetadata;
    });
    return result;
  }

  {{/ if }}
  {{# each memberVariables }}
  {{> complexMember member=this }}


  {{ else }}
  {{/ each }}
{{# if (eq dataType.normalizedName "Resource") }}
  constructor() {
    super();
    this.resourceType = this.getTypeName();
  }
  
{{/ if }}
{{> primaryCode }}
{{# if dataType.primitive }}
  {{> primitiveParse }}
{{ else }}
  {{> complexParse }}
{{/ if }}

  public static is{{ dataType.normalizedName }}(input?: unknown): input is {{ dataType.normalizedName }} {
    const castInput = input as {{ dataType.normalizedName }};
    return !!input && castInput.getTypeName && castInput.getTypeName() === "{{ dataType.normalizedName }}";
  }
{{# if (eq dataType.normalizedName "Extension") }}

  public static serializePrimitiveExtension(
    primitive: Element
  ): IElement | undefined {
    let result: IElement | undefined;
    if (primitive.id || primitive.extension) {
      result = {};
      result.id = primitive.id;
      result.extension = primitive?.extension?.map((x) => x.toJSON());
    }
    return result;
  }

  public static serializePrimitiveExtensionArray(
    primitives: Array<Element>
  ): Array<IElement | null> | undefined {
    const initial: Array<IElement | null> = [];
    const result = primitives.reduce((accumulator, currentPrim) => {
      const serializedExtension = Extension.serializePrimitiveExtension(
        currentPrim
      );
      if (serializedExtension) {
        accumulator.push(serializedExtension);
      } else {
        accumulator.push(null);
      }
      return accumulator;
    }, initial);

    if (result.find((x) => !!x)) {
      return result;
    }
    return undefined;
  }
{{/ if }}
{{# unless dataType.primitive }}

  public toJSON(): I{{ dataType.normalizedName }} {
    const result: I{{ dataType.normalizedName }} = {{# if parentDataType ~}}
      super.toJSON()
    {{~ else ~}}
      {}
    {{~/ if ~}};

  {{# each memberVariables }}
  {{# each choiceTypes }}
    if (this.{{ ../variableName }} && {{ normalizedName }}.is{{ normalizedName }}(this.{{ ../variableName }})) {
      result.{{ ../variableName }}{{ trimPrimitiveName normalizedName}} = this.{{ ../variableName }}
      {{~# unless systemType ~}}
        {{~# if primitive ~}}
          .value
        {{~ else ~}}
          .toJSON()
        {{~/ if ~}}
      {{~/ unless ~}};
    {{# if primitive }}
      result._{{ ../variableName }}{{ trimPrimitiveName normalizedName}} = Extension.serializePrimitiveExtension(this.{{ ../variableName }});
    {{/ if }}
    }

  {{ else }}
    if (this.{{ variableName }}) {
      result.{{ variableName }} = this.{{ variableName }}
      {{~# unless dataType.systemType ~}}
        {{~# if isArray ~}}
          {{~# if dataType.primitive ~}}
            .filter(x => !!x).map(x => x.value) as typeof result.{{ variableName }}
          {{~ else ~}}
            .map((x) => x.toJSON())
          {{~/ if ~}}
        {{~ else ~}}
          {{~# if dataType.primitive ~}}
            .value
          {{~ else ~}}
            .toJSON()
          {{~/ if ~}}
        {{~/ if ~}}
      {{~/ unless ~}};
    {{# if dataType.primitive }}
    {{# if isArray }}
      result._{{ variableName }} = Extension.serializePrimitiveExtensionArray(this.{{ variableName }});
    {{ else }}
      result._{{ variableName }} = Extension.serializePrimitiveExtension(this.{{ variableName }});
    {{/ if }}
    {{/ if }}
    }

  {{/ each }}
  {{/ each }}
    return result;
  }
{{/ unless }}

  public clone(): {{ dataType.normalizedName }} {
  {{# if dataType.primitive }}
    const result = new {{ dataType.normalizedName }}();
    const parentClone = super.clone();
    result.id = parentClone.id;
    result.extension = parentClone.extension;
    result.value = this.value;
    return result;
  {{ else }}
    return {{ dataType.normalizedName }}.parse(this.toJSON());
  {{/ if }}
  }

  public getTypeName(): string {
    return "{{ dataType.normalizedName }}";
  }
}
/* eslint-enable import/prefer-default-export, import/no-cycle */
`;

export interface TemplateContext {
  dataType: DataType;
  parentDataType: DataType | null;
  metadata: EntityMetadata;
  memberVariables: Array<MemberVariable>;
  imports: EntityImports;
  primaryCode: PrimaryCode | null;
}

export default Handlebars.compile<TemplateContext>(source);
