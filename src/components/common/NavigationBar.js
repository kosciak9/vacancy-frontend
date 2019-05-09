/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { opacify } from "polished";
import { NavLink } from "react-router-dom";

import logout from "components/common/svgs/logout.svg";
import {
  WarningRedWithOpacity,
  TextBlack,
  ActiveNavigationLink,
  HoveredNavigationLink,
  TextWhite
} from "components/common/styles/Colors";
import { floatingNavbar } from "components/common/styles/Layout";
import SVGButton from "components/common/SVGButton";

const NavigationLink = css({
  width: 180,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: TextBlack,
  textDecoration: "none",
  transition: "0.3s all",
  marginRight: 20,
  "&:hover": {
    backgroundColor: HoveredNavigationLink
  },
  "&.active": {
    backgroundColor: ActiveNavigationLink
  }
});

const LogoutButton = css({
  width: 40,
  backgroundColor: opacify(-1, TextBlack),
  cursor: "pointer",
  marginRight: 0,
  border: "none",
  alignSelf: "flex-end",
  justifySelf: "flex-end",
  "&:hover": {
    backgroundColor: WarningRedWithOpacity
  }
});

const NavigationBar = props => {
  return (
    <nav css={[floatingNavbar, { padding: 20, backgroundColor: TextWhite }]}>
      <NavLink css={NavigationLink} to="/availability">
        Your Availability
      </NavLink>
      <NavLink css={NavigationLink} to="/captain">
        Captain View
      </NavLink>
      <NavLink css={NavigationLink} to="/settings">
        Personal Settings
      </NavLink>
      <SVGButton
        height={40}
        additionalCss={{ ...NavigationLink, ...LogoutButton }}
        onClick={props.login.userLogout}
        image={logout}
        altText="exit door"
      />
    </nav>
  );
};

export default NavigationBar;
