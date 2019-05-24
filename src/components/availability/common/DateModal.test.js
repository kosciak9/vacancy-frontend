import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DateModal from "components/availability/common/DateModal";
import MockDate from "mockdate";
import DayPicker from "react-day-picker";

Enzyme.configure({ adapter: new Adapter() });

describe("<DateModal />", () => {
  it("should mount", () => {
    const updateParent = jest.fn();
    const wrapper = Enzyme.mount(<DateModal updateParent={updateParent} />);
    expect(wrapper.find(DateModal)).toBeTruthy();
  });

  it("should render correct amount of months on mobile", () => {
    // @ts-ignore
    global.innerWidth = 500;
    const updateParent = jest.fn();
    const wrapper = Enzyme.mount(<DateModal updateParent={updateParent} />);
    wrapper
      .find("div")
      .first()
      .simulate("click");
    expect(wrapper.find(".DayPicker-Month").length).toBe(1);
  });

  it("should render correct amount of months on desktop", () => {
    // @ts-ignore
    global.innerWidth = 1920;
    const updateParent = jest.fn();
    const wrapper = Enzyme.mount(<DateModal updateParent={updateParent} />);
    wrapper
      .find("div")
      .first()
      .simulate("click");
    expect(wrapper.find(".DayPicker-Month").length).toBe(5);
  });

  it("clicking button should close modal", () => {
    const updateParent = jest.fn();
    const wrapper = Enzyme.mount(<DateModal updateParent={updateParent} />);
    expect(wrapper.children.length).toBe(1);
    wrapper
      .find("div")
      .first()
      .simulate("click");
    expect(wrapper.find(".DayPicker").length).toBe(1);
    wrapper.findWhere(node => node.props().width === 120).simulate("click");
    expect(wrapper.find(".DayPicker").length).toBe(0);
    expect(updateParent).toHaveBeenCalledWith({
      from: null,
      to: null
    });
  });

  it("clicking day should add it to date range", () => {
    MockDate.set("1/1/2001");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const updateParent = jest.fn();
    const wrapper = Enzyme.mount(
      <DateModal updateParent={updateParent} from={today} to={today} />
    );
    wrapper
      .find("div")
      .first()
      .simulate("click");
    wrapper.find("DayPicker").prop("onDayClick")(tomorrow);
    wrapper.findWhere(node => node.props().width === 120).simulate("click");
    expect(updateParent).toHaveBeenCalledWith({
      from: today,
      to: tomorrow
    });
  });
});
