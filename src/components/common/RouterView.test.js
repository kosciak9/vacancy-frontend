import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import RouterView from "components/common/RouterView";
import { domainToASCII } from "url";
Enzyme.configure({ adapter: new Adapter() });

describe("test NavigationBar component", () => {
  it("should mount", () => {
    const wrapper = Enzyme.mount(
      <MemoryRouter>
        <RouterView />
      </MemoryRouter>
    );
    expect(wrapper.find(RouterView)).toBeTruthy();
  });

  it("each route loads proper View", () => {
    const wrapper = Enzyme.mount(
      <MemoryRouter>
        <RouterView />
      </MemoryRouter>
    );
    expect(location.pathname).toBe("/");

    window.history.pushState({}, "RouterTest", "/availability");
    expect(location.pathname).toBe("/availability");
    expect(wrapper.find("AvailabilityView")).toBeTruthy();

    window.history.pushState({}, "RouterTest", "/captain");
    expect(location.pathname).toBe("/captain");
    expect(wrapper.find("CaptainView")).toBeTruthy();

    window.history.pushState({}, "RouterTest", "/settings");
    expect(location.pathname).toBe("/settings");
    expect(wrapper.find("PersonalSettingsView")).toBeTruthy();
  });
});
