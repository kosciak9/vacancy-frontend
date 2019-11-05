import wretch from "wretch";
import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";

const VACANCY_TOKEN_KEY = "localStorageVacancyToken";

const useLogin = () => {
  const [login, setLogin] = useState({
    loggedIn: false,
    token: null,
    checkLocalStorage: true
  });

  useEffect(() => {
    if (login.checkLocalStorage) {
      const token = localStorage.getItem(VACANCY_TOKEN_KEY);
      if (token) {
        setLogin({ loggedIn: true, token, checkLocalStorage: false });
      }
    }
  }, [login.checkLocalStorage]);

  const loginUser = async (email, password) => {
    const w = wretch().url("/api/authenticate");
    try {
      const response = await w.post({ email, password }).json();
      localStorage.setItem(VACANCY_TOKEN_KEY, response.auth_token);
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

  const logoutUser = () => {
    localStorage.removeItem(VACANCY_TOKEN_KEY);
    setLogin(login => {
      return {
        ...login,
        loggedIn: false,
        token: null
      };
    });
  };
  return { login, loginUser, logoutUser };
};

const Login = createContainer(useLogin);

export default Login;
