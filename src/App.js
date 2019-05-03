/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoginView from "./pages/LoginView";
import RouterView from "./pages/RouterView";
import { Provider, Subscribe } from "unstated";
import LoginContainer from "./store/LoginContainer";

const App = () => {
  return (
    <div css={{ height: "100%", width: "100%" }}>
      <Provider>
        <Subscribe to={[LoginContainer]}>
          {login =>
            login.state.userLoggedIn ? (
              <RouterView login={login} />
            ) : (
              <LoginView login={login} />
            )
          }
        </Subscribe>
      </Provider>
    </div>
  );
};

export default App;
