/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { flexCenter } from "components/common/styles/Layout";
import { Provider, Subscribe } from "unstated";
import LoginContainer from "store/LoginContainer";
import LoginForm from "components/login/LoginForm";

const LoginView = props => {
  useEffect(() => {
    // autologin from LocalStorage on load
    props.login.userLogin({});
  });

  return (
    <main css={flexCenter}>
      <Provider>
        <Subscribe to={[LoginContainer]}>
          {login => <LoginForm login={login} />}
        </Subscribe>
      </Provider>
    </main>
  );
};

export default LoginView;
