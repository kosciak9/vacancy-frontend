import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginForm from "components/login/LoginForm";

Enzyme.configure({ adapter: new Adapter() });

describe("<LoginForm />", () => {
  it("should mount", () => {
    const login = {
      userLogin: jest.fn()
    };
    const wrapper = Enzyme.shallow(<LoginForm login={login} />);
    expect(wrapper.find(LoginForm)).toBeTruthy();
  });

  it("should render initial WarningMessage", () => {
    const login = {
      userLogin: jest.fn()
    };
    const wrapper = Enzyme.shallow(
      <LoginForm initialMessage={"test"} login={login} />
    );
    expect(wrapper.find(LoginForm)).toBeTruthy();
    expect(wrapper.find("WarningMessage")).toBeTruthy();
  });
});
