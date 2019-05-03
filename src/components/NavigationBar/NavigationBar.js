/** @jsx jsx */
import { jsx } from "@emotion/core";
import { NavLink } from "react-router-dom";

import logout from "./logout.svg";

const NavigationLink = {
  width: 180,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  textDecoration: "none",
  transition: "0.3s all",
  marginRight: 20,
  "&:hover": {
    backgroundColor: "rgba(136, 191, 41, 0.5)"
  },
  "&.active": {
    backgroundColor: "#88BF29"
  }
};

const LogoutButton = {
  width: 40,
  backgroundColor: "rgba(0, 0, 0, 0.0)",
  cursor: "pointer",
  marginRight: 0,
  border: "none",
  alignSelf: "flex-end",
  justifySelf: "flex-end",
  "&:hover": {
    backgroundColor: "rgba(226, 104, 60, 0.75);"
  }
};

const NavigationBar = props => {
  return (
    <nav
      css={{
        position: "fixed",
        top: 0,
        display: "flex",
        padding: 20,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <NavLink css={NavigationLink} to="/availability">
        Your Availability
      </NavLink>
      <NavLink css={NavigationLink} to="/captain">
        Captain View
      </NavLink>
      <button
        css={{ ...NavigationLink, ...LogoutButton }}
        onClick={props.login.userLogout}
      >
        <img
          src={logout}
          alt="exit door"
          css={{ display: "block", margin: "auto" }}
        />
      </button>
    </nav>
  );
};

export default NavigationBar;
