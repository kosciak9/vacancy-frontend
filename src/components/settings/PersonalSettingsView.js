/** @jsx jsx */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoginContainer from "../../store/LoginContainer";
import { Provider, Subscribe } from "unstated";
import PasswordChange from "components/settings/PasswordChange";

const PersonalSettingsView = () => {
  return (
    <main
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100
      }}
    >
      <Provider>
        <Subscribe to={[LoginContainer]}>
          {login => <PasswordChange login={login} />}
        </Subscribe>
      </Provider>
    </main>
  );
};

export default PersonalSettingsView;
