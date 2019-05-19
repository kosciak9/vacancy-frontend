import formValidation from "components/common/form/FormValidation";

describe("FormValidation", () => {
  it("when value is wrong return proper error", () => {
    expect(formValidation("te")).toBe(
      "Field needs to be at least 4 characters long"
    );
    expect(formValidation()).toBe(
      "Field needs to be at least 4 characters long"
    );
  });

  it("when value is right, return undefined", () => {
    expect(formValidation("test")).toBeUndefined();
  });
});
