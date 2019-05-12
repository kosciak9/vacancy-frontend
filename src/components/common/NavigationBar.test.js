import React from "react";
// import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationBar from "components/common/NavigationBar";
import { MemoryRouter } from "react-router";
import { NavLink } from "react-router-dom";
import SVGButton from "components/common/SVGButton";

Enzyme.configure({ adapter: new Adapter() });

describe("test NavigationBar component", () => {
  it("should mount", () => {
    const mockLogout = jest.fn(() => {});
    const mockLoginStore = { userLogout: mockLogout };
    const wrapper = Enzyme.mount(
      <MemoryRouter>
        <NavigationBar login={mockLoginStore} />
      </MemoryRouter>
    );
    expect(wrapper.contains(NavigationBar)).toBeTruthy;
  });
  it("should mount with four routes", () => {
    const mockLogout = jest.fn(() => {});
    const mockLoginStore = { userLogout: mockLogout };
    const wrapper = Enzyme.mount(
      <MemoryRouter>
        <NavigationBar login={mockLoginStore} />
      </MemoryRouter>
    );
    expect(wrapper.find(NavLink)).toHaveLength(3);
    expect(wrapper.find(SVGButton)).toHaveLength(1);
  });

  it("clicking NavLink should change route", () => {
    const mockLogout = jest.fn(() => {});
    const mockLoginStore = { userLogout: mockLogout };
    const wrapper = Enzyme.mount(
      <MemoryRouter>
        <NavigationBar login={mockLoginStore} />
      </MemoryRouter>
    );
    const AvailabilityLink = wrapper.find(NavLink).first();
    AvailabilityLink.simulate("click");
    expect(location.pathname === "/availability");
  });

  it("clicking logout fire login.userLogout", () => {
    const mockLogout = jest.fn(() => {});
    const mockLoginStore = { userLogout: mockLogout };
    const wrapper = Enzyme.mount(
      <MemoryRouter>
        <NavigationBar login={mockLoginStore} />
      </MemoryRouter>
    );
    const AvailabilityLink = wrapper.find(SVGButton);
    AvailabilityLink.simulate("click");
    expect(mockLogout).toHaveBeenCalled();
  });
});
