import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DayInput from "components/availability/personal/DayInput";

Enzyme.configure({ adapter: new Adapter() });

describe("<DayInput />", () => {
  it("should mount", () => {
    const day = new Date("2019-05-30T13:00:00");
    const availability = [];
    const wrapper = Enzyme.render(
      <DayInput availability={availability} day={day} />
    );
    expect(wrapper.find("DayInput")).toBeTruthy();
  });

  it("should render correctly", () => {
    const day = new Date("2019-05-30T13:00:00");
    const availability = [{ id: 1 }, { id: 2 }];
    const wrapper = Enzyme.shallow(
      <DayInput availability={availability} day={day} />
    );
    expect(wrapper.find("HourInput")).toHaveLength(2);
    expect(wrapper.find("SVGButton")).toHaveLength(3);
    expect(wrapper.text()).toContain("Thu, 30.05");
  });
});
