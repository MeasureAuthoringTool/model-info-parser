import {
  Resource,
  DomainResource,
  ResourceChild
} from "./fixture/generatedTypeScript/fhir";

describe("generated resourceType value, set in constructor or Resources", () => {

  it("work for the base type Resource", () => {
    const resource = new Resource();
    expect(resource.resourceType).toBe("Resource");
  });

  it("work for the subclass DomainResource", () => {
    const resource = new DomainResource();
    expect(resource.resourceType).toBe("DomainResource");
  });

  it("work for the subclass ResourceChild", () => {
    const resource = new ResourceChild();
    expect(resource.resourceType).toBe("ResourceChild");
  });
});
