import LoginContainer from "store/LoginContainer";
import moxios from "moxios";

describe("LoginContainer", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("LoginContainer state", () => {
    it("initial state of Container is right", () => {
      const login = new LoginContainer();
      expect(login.state.userLoggedIn === false);
    });
  });

  describe("prepareAxiosAgent", () => {
    it("should save proper agent when called with token", async done => {
      const login = new LoginContainer();
      await login.prepareAxiosAgent("user_token");
      expect(login.state.agent).not.toBeUndefined();
      done();
    });
    it("should save undefined as agent when called without token", async done => {
      const login = new LoginContainer();
      await login.prepareAxiosAgent(null);
      expect(login.state.agent).toBeUndefined();
      done();
    });
  });

  describe("test fetching userToken", () => {
    it("works with proper password", done => {
      const login = new LoginContainer();
      login.fetchUserToken("test_user", "hunter2").then(token => {
        expect(token).toBe("test_token");
        done();
      });
      moxios.wait(function() {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { auth_token: "test_token" }
        });
      });
    });
    it("doesn't work with wrong password", done => {
      const login = new LoginContainer();
      login.fetchUserToken("test_user", "hunter1").catch(error => {
        expect(error.response.status).toBe(401);
        done();
      });
      moxios.wait(function() {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: { random_output: "test" }
        });
      });
    });
  });
  describe("test fetching userInfo", () => {
    const USER_ID = "ad5839f0-2395-4cfe-add4-b1a58dfb4b9b";
    it("should work", async done => {
      moxios.stubRequest("/api/auth/user/me", {
        status: 200,
        response: {
          id: USER_ID
        }
      });
      moxios.stubRequest(`/api/v1/users/${USER_ID}/`, {
        status: 200,
        response: {
          team: 1
        }
      });
      const login = new LoginContainer();
      await login.prepareAxiosAgent("123");
      await login.fetchUserInfo();
      const teamId = login.state.team;
      expect(teamId).toBe(1);
      done();
    });
  });
  describe("test userLogin", () => {
    it("should fetch token from local memory when no username provided", async done => {
      const login = new LoginContainer();
      // mock stuff
      login.prepareAxiosAgent = jest.fn();
      localStorage.setItem("userToken", "user_token");
      const result = await login.userLogin({});
      expect(result).toBeTruthy();
      done();
    });

    it("should fetch token from local memory when no username provided", async done => {
      const login = new LoginContainer();
      // mock stuff
      const prepareAxiosAgent = jest.fn();
      login.prepareAxiosAgent = prepareAxiosAgent;
      localStorage.setItem("userToken", "user_token");
      const result = await login.userLogin({});
      expect(prepareAxiosAgent).toHaveBeenCalledWith("user_token");
      expect(result).toBeTruthy();
      done();
    });

    it("should throw when cannot login", async done => {
      const login = new LoginContainer();
      // mock stuff
      const fetchUserToken = jest.fn(() => {
        const error = { response: { status: 401 } };
        throw error;
      });
      login.fetchUserToken = fetchUserToken;
      localStorage.removeItem("userToken");
      try {
        await login.userLogin({
          username: "test",
          password: "hunter2"
        });
      } catch (error) {
        expect(error.response.status).toBe(401);
        done();
      }
    });
  });
  describe("test userLogout", () => {
    it("should logout user", async done => {
      const login = new LoginContainer();
      // mock stuff
      const prepareAxiosAgent = jest.fn();
      login.prepareAxiosAgent = prepareAxiosAgent;
      localStorage.setItem("userToken", "user_token");
      await login.userLogout();
      expect(prepareAxiosAgent).toHaveBeenCalledWith(null);
      expect(localStorage.getItem("userToken")).toBe(null);
      done();
    });
  });
  describe("test changePassword", () => {
    it("should change password with proper input", async done => {
      moxios.stubRequest("/api/auth/password/", {
        status: 200,
        response: {
          success: true
        }
      });
      const login = new LoginContainer();
      const response = await login.changePassword({
        newPassword: 123,
        reNewPassword: 123,
        currentPassword: 12
      });
      expect(response.status).toBe(200);
      done();
    });
    it("shouldn't change password when input invalid", async done => {
      moxios.stubRequest("/api/auth/password/", {
        status: 401,
        response: {
          success: false
        }
      });
      const login = new LoginContainer();
      try {
        await login.changePassword({
          newPassword: 123,
          reNewPassword: 123,
          currentPassword: 12
        });
      } catch (error) {
        expect(error.response.status).toBe(401);
        done();
      }
    });
  });
});
