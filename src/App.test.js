import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "unstated";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
  it("should show LoginView when user not logged in", () => {
    const login = {
      state: { userLoggedIn: false },
      setState: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn()
    };
    const wrapper = Enzyme.mount(
      <Provider inject={[login]}>
        <App />
      </Provider>
    );
    expect(wrapper.find(App)).toBeTruthy();
    expect(wrapper.find("LoginView")).toBeTruthy();
  });
  it("should show RouterView when user logged in", () => {
    const login = {
      state: { userLoggedIn: true },
      setState: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn()
    };
    const wrapper = Enzyme.mount(
      <Provider inject={[login]}>
        <App />
      </Provider>
    );
    expect(wrapper.find(App)).toBeTruthy();
    expect(wrapper.find("RouterView")).toBeTruthy();
  });
});
