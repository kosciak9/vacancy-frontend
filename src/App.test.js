import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
  it("should mount", () => {
    const wrapper = Enzyme.mount(
      <App />
    );
    expect(wrapper.find(App)).toBeTruthy();
  });
});

