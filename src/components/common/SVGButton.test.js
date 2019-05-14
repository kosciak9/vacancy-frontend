import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SVGButton from "components/common/SVGButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<SVGButton />", () => {
  it("should mount", () => {
    const wrapper = Enzyme.mount(<SVGButton />);
    expect(wrapper.find("button")).toBeTruthy();
  });
  it("should respond to click event", () => {
    const onClickMock = jest.fn();
    const wrapper = Enzyme.mount(<SVGButton onClick={onClickMock} />);
    wrapper.find("button").simulate("click");
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});