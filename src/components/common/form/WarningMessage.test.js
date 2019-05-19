import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WarningMessage from "components/common/form/WarningMessage";

Enzyme.configure({ adapter: new Adapter() });

describe("test NavigationBar component", () => {
  it("should mount", () => {
    const wrapper = Enzyme.mount(<WarningMessage message={"hello world"} />);
    expect(wrapper.find(WarningMessage)).toBeTruthy();
    expect(wrapper.find(WarningMessage).text()).toContain("hello world");
  });
});
