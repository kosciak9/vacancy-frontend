import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PersonalAvailability from "components/availability/personal/PersonalAvailability";
import prepareAvailabilityMock from "components/availability/personal/__mocks__/PrepareAvailability";

Enzyme.configure({ adapter: new Adapter() });

describe("<PersonalAvailability />", () => {
  it("should render correctly", () => {
    const state = {
      priority_days_ahead: 7,
      userLoggedIn: false
    };
    const fetchUserInfo = jest.fn();
    const login = { state, fetchUserInfo };
    const wrapper = Enzyme.shallow(<PersonalAvailability login={login} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("DateModal").exists()).toBeTruthy();
  });

  // how to fix this? TODO :(
  // it("should fetch user info on mount", () => {
  //   const state = {
  //     priority_days_ahead: 7,
  //     userLoggedIn: true
  //   };
  //   const fetchUserInfo = jest.fn();
  //   const login = { state, fetchUserInfo };
  //   const wrapper = Enzyme.render(<PersonalAvailability login={login} />);
  //   expect(fetchUserInfo).toHaveBeenCalled();
  //   expect(prepareAvailabilityMock).toHaveBeenCalled();
  // });
});
