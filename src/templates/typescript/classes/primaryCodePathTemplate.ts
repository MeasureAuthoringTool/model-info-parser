export default `{{# if (eq dataType.normalizedName "Type") }}
  get primaryCode(): Type | undefined {
    return undefined;
  }

{{/ if }}
{{# if primaryCode }}
  get primaryCode(): {{# each primaryCode.returnType }}{{ normalizedName }} | {{/ each }}undefined {
    return this{{# each primaryCode.pathSegments }}
    {{~# if isArray ~}}
      ?.{{ path }}?.[0]
    {{~ else ~}}
      ?.{{ path }}
    {{~/ if }}
    {{~/ each }};
  }

  set primaryCode(primaryCode: {{# each primaryCode.returnType }}{{ normalizedName }} | {{/ each }}undefined) {
  {{# each primaryCode.pathSegments }}
  {{# unless @last }}
    this
    {{~# each ../primaryCode.pathSegments }}
      {{~# ifLessThanEqual @index @../index ~}}
        .{{ path }}
      {{~/ ifLessThanEqual }}
    {{~/ each }} = this{{~# each ../primaryCode.pathSegments }}
      {{~# ifLessThanEqual @index @../index ~}}
        .{{ path }}
      {{~/ ifLessThanEqual }}
    {{~/ each }} || {{# if isArray ~}}
      [new {{ dataType.normalizedName }}()];
    {{ else ~}}
      new {{ dataType.normalizedName }}();
    {{/ if }}
  {{/ unless }}
  {{/ each }}
    this
    {{~# each primaryCode.pathSegments ~}}
    {{~# if isArray ~}}
    {{~# if @last ~}}
      .{{ path }}
    {{~ else ~}}
      .{{ path }}[0]
    {{~/ if ~}}
    {{~ else ~}}
      .{{ path }}
    {{~/ if ~}}
    {{~# if @last }}
    {{# if isArray }}
 = primaryCode ? [primaryCode] : [];
    {{ else }}
 = primaryCode;
    {{/ if }}
    {{/ if }}
    {{/ each }}
  }

{{/ if }}`;
