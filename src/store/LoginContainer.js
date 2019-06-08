import axios from "axios";
import { Container } from "unstated";

class LoginContainer extends Container {
  name = "LoginContainer";

  state = {
    userLoggedIn: false,
    agent: undefined,
    team: {}
  };

  fetchUserToken = async (username, password) => {
    const response = await axios.post("/api/auth/token/login/", {
      username,
      password
    });
    return response.data.auth_token;
  };

  fetchUserInfo = async () => {
    const userInfo = await this.state.agent.get("/api/auth/me/");
    const playerInfo = await this.state.agent.get(
      `/api/v1/users/${userInfo.data.id}/`
    );
    const teamInfo = await this.state.agent.get(
      `/api/v1/teams/${playerInfo.data.team}/`
    );
    await this.setState({ ...teamInfo.data, ...playerInfo.data });
  };

  prepareAxiosAgent = async token => {
    const agent = token
      ? axios.create({
          headers: { authorization: `Token ${token}` }
        })
      : undefined;
    await this.setState({ agent, __action: "AGENTCHANGE" });
  };

  userLogin = async ({ username = null, password = null }) => {
    let token = null;
    if (username && password) {
      token = await this.fetchUserToken(username, password);
    } else {
      token = localStorage.getItem("userToken");
    }
    if (token) {
      this.prepareAxiosAgent(token);
      localStorage.setItem("userToken", token);
      await this.setState({ userLoggedIn: true, __action: "USERLOGIN" });
      return true;
    } else {
      return false;
    }
  };

  changePassword = async ({ newPassword, reNewPassword, currentPassword }) => {
    try {
      const response = await axios.post("/api/auth/password/", {
        new_password: newPassword,
        re_new_password: reNewPassword,
        current_password: currentPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  userLogout = async () => {
    localStorage.removeItem("userToken");
    this.prepareAxiosAgent(null);
    await this.setState({ userLoggedIn: false, __action: "USERLOGOUT" });
  };
}
export default LoginContainer;
