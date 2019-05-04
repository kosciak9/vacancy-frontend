/** @jsx jsx */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PasswordChange from "../components/PasswordChange";

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
      <PasswordChange />
    </main>
  );
};

export default PersonalSettingsView;
