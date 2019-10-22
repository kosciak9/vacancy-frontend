import wretch from "wretch";
import { useState } from "react";
import { createContainer } from "unstated-next";

const useLogin = () => {
  const [login, setLogin] = useState({ loggedIn: false, token: null });
  const loginUser = async (email, password) => {
    const w = wretch().url("/api/authenticate");
    try {
      const response = await w.post({ email, password }).json();
      setLogin(login => {
        return {
          ...login,
          loggedIn: true,
          token: response.auth_token
        };
      });
    } catch (error) {
      console.error(error);
    }
  };
  return { login, loginUser };
};

const Login = createContainer(useLogin);

export default Login;
