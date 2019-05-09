/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoginView from "components/login/LoginView";
import RouterView from "components/common/RouterView";
import { Provider, Subscribe } from "unstated";
import LoginContainer from "./store/LoginContainer";

const App = () => {
  return (
    <Provider>
      <Subscribe to={[LoginContainer]}>
        {login =>
          login.state.userLoggedIn ? (
            <RouterView />
          ) : (
            <LoginView login={login} />
          )
        }
      </Subscribe>
    </Provider>
  );
};

export default App;
