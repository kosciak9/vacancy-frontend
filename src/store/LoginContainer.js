import axios from "axios";
import { Container } from "unstated";

class LoginContainer extends Container {
  name = "LoginContainer";

  state = {
    userLoggedIn: false,
    client: null
  };

  fetchUserToken = async (username, password) => {
    const response = await axios.post("/api/auth/token/login/", {
      username,
      password
    });
    return response.data.auth_token;
  };

  fetchUserInfo = async () => {
    const userInfo = await axios.get("/api/auth/user/me");
    const playerInfo = await axios.get(`/api/v1/users/${userInfo.data.id}`);
    this.setState({ team: playerInfo.data.team });
  };

  setAxiosHeader = token => {
    if (token) {
      const client = axios.create({
        headers: {
          Authorization: `Token ${token}`
        }
      });
      this.setState({ client });
    } else if (axios.defaults.headers.common["Authorization"]) {
      this.setState({ client: null });
    }
  };

  userLogin = async ({ username = null, password = null }) => {
    let token = null;
    if (username && password) {
      token = await this.fetchUserToken(username, password);
    } else {
      token = localStorage.getItem("userToken");
    }
    if (token) {
      this.setAxiosHeader(token);
      localStorage.setItem("userToken", token);
      await this.setState({ userLoggedIn: true, __action: "USERLOGIN" });
      return;
    } else {
      return false;
    }
  };

  changePassword = ({ newPassword, reNewPassword, currentPassword }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("/api/auth/password/", {
          new_password: newPassword,
          re_new_password: reNewPassword,
          current_password: currentPassword
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  userLogout = async () => {
    console.log("test");
    localStorage.removeItem("userToken");
    this.setAxiosHeader(null);
    await this.setState({ userLoggedIn: false, __action: "USERLOGOUT" });
  };
}
export default LoginContainer;
