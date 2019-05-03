import axios from "axios";
import { Container } from "unstated";

class LoginContainer extends Container {
  name = "LoginContainer";

  state = {
    userLoggedIn: false
  };

  fetchUserToken = async (username, password) => {
    const response = await axios.post(
      "http://localhost:8001/auth/token/login/",
      {
        username,
        password
      }
    );
    return response.data.auth_token;
  };

  setAxiosHeader = token => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    } else if (axios.defaults.headers.common["Authorization"]) {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  userLogin = async ({ username = null, password = null }) => {
    let token = null;
    if (username && password) {
      token = await this.fetchUserToken(username, password);
    } else {
      // token = localStorage.getItem("userToken", null);
    }
    if (token) {
      this.setAxiosHeader(token);
      // localStorage.setItem("userToken", token);
      await this.setState({ userLoggedIn: true, __action: "USERLOGIN" });
      return true;
    } else {
      return false;
    }
  };

  userLogout = async () => {
    console.log("test");
    localStorage.removeItem("userToken");
    this.setAxiosHeader(null);
    await this.setState({ userLoggedIn: false, __action: "USERLOGOUT" });
  };
}
export default LoginContainer;
