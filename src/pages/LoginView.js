/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";

const LoginView = props => {
  useEffect(() => {
    props.login.userLogin({});
  });
  return (
    <main
      css={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <LoginForm />
    </main>
  );
};

export default LoginView;
