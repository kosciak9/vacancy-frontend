import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HourInput from "components/availability/personal/HourInput";

Enzyme.configure({ adapter: new Adapter() });

describe("<HourInput />", () => {
  it("should mount", () => {
    const changeAvailability = jest.fn();
    const hour = {
      time: "10:00:00",
      available: true
    };
    const wrapper = Enzyme.shallow(
      <HourInput hour={hour} changeAvailability={changeAvailability} />
    );
    expect(wrapper.find(HourInput)).toBeTruthy();
  });

  it("should render correctly", () => {
    const changeAvailability = jest.fn();
    const hour = {
      time: "10:00:00",
      available: true
    };
    const wrapper = Enzyme.shallow(
      <HourInput hour={hour} changeAvailability={changeAvailability} />
    );
    expect(wrapper.find("input").prop("checked")).toBeTruthy();
    expect(wrapper.contains(<span>10:00</span>));
  });

  it("should fire function on click", () => {
    const hour = {
      id: 1,
      time: "10:00:00",
      available: true,
      date: "2019-05-20"
    };
    const changeAvailability = jest.fn(
      (date, id, available) => (hour.available = available)
    );
    const wrapper = Enzyme.shallow(
      <HourInput hour={hour} changeAvailability={changeAvailability} />
    );
    expect(wrapper.find("input").props().checked).toBeTruthy();
    wrapper
      .find("input")
      .simulate("change", { target: { checked: !hour.available } });
    expect(changeAvailability).toBeCalledWith("2019-05-20", 1, false);
    expect(hour.available).toBeFalsy();
    wrapper.setProps({ hour });
    expect(wrapper.find("input").props().checked).toBeFalsy();
  });
});
