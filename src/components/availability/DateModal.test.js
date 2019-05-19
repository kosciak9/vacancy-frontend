import React from "react";
import ReactDOM from "react-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DateModal from "components/availability/DateModal";

Enzyme.configure({ adapter: new Adapter() });

describe("<DateModal />", () => {
  it("should mount", () => {
    const updateParent = jest.fn();
    const wrapper = Enzyme.mount(<DateModal updateParent={updateParent} />);
    expect(wrapper.find(DateModal)).toBeTruthy();
  });

  it("should render correct amount of months on mobile", () => {
    global.innerWidth = 500;
    const updateParent = jest.fn();
    const wrapper = Enzyme.mount(<DateModal updateParent={updateParent} />);
    wrapper.find("div").simulate("click");
    expect(wrapper.find(".DayPicker-Month").length).toBe(1);
  });

  it("should render correct amount of months on desktop", () => {
    global.innerWidth = 1920;
    const updateParent = jest.fn();
    const wrapper = Enzyme.mount(<DateModal updateParent={updateParent} />);
    wrapper.find("div").simulate("click");
    expect(wrapper.find(".DayPicker-Month").length).toBe(5);
  });

  it("clicking button should close modal", () => {
    const updateParent = jest.fn();
    const wrapper = Enzyme.mount(<DateModal updateParent={updateParent} />);
    expect(wrapper.children.length).toBe(1);
    wrapper.find("div").simulate("click");
    expect(wrapper.find(".DayPicker").length).toBe(1);
    wrapper.find("button").simulate("click");
    expect(wrapper.find(".DayPicker").length).toBe(0);
    expect(updateParent).toHaveBeenCalledWith({
      from: undefined,
      to: undefined
    });
  });

  // it("clicking outside of modal should close it", () => {
  //   const updateParent = jest.fn();
  //   const outerNode = document.createElement("div");
  //   document.body.appendChild(outerNode);
  //   const wrapper = Enzyme.mount(<DateModal updateParent={updateParent} />, {
  //     attachTo: outerNode
  //   });
  //   expect(wrapper.children.length).toBe(1);
  //   wrapper.find(".DateModal-Result").simulate("click");
  //   expect(wrapper.find(".DayPicker").length).toBe(1);
  //   outerNode.dispatchEvent(new Event("focus", { bubbles: true }));
  //   outerNode.dispatchEvent(new Event("blur", { bubbles: true }));
  //   expect(wrapper.find(".DayPicker").length).toBe(0);
  //   expect(updateParent).not.toHaveBeenCalled();
  // });
});
