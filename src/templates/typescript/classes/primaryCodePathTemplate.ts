export default `{{# if (eq dataType.normalizedName "Type") }}
  get primaryCode(): Type | undefined {
    return undefined;
  }

{{/ if }}
{{# if primaryCodeType }}
  get primaryCode(): {{ primaryCodeType.dataType.normalizedName }} | undefined {
    return this.{{ primaryCodeType.path }};
  }

  set primaryCode(primaryCode: {{ primaryCodeType.dataType.normalizedName }} | undefined) {
  {{# if primaryCodeType.isArray }}
    this.{{ metadata.primaryCodePath }} = primaryCode ? [primaryCode] : [];
  {{ else }}
    this.{{ metadata.primaryCodePath }} = primaryCode;
  {{/ if }}
  }

{{/ if }}`;
