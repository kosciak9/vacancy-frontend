/** @jsx jsx */
import { jsx } from "@emotion/core";
import theme from "common/theme";
import IconButton from "components/IconButton";
import NavigationLink from "components/NavigationLink";
import { LogOut } from "react-feather";

export default function NavigationBar() {
  return (
    <nav
      aria-label="Navigation menu"
      css={theme => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing(2),
        "> *": {
          margin: theme.spacing(1)
        },
        width: "100%"
      })}
    >
      <NavigationLink href="/personal">Your availability</NavigationLink>
      <NavigationLink href="/team">Team availability</NavigationLink>
      <NavigationLink href="/personal/settings">
        Personal settings
      </NavigationLink>
      <NavigationLink href="/team/settings">Team settings</NavigationLink>
      <IconButton
        color={theme.palette.warning}
        aria-label="logout"
        message="Logout from application"
      >
        <LogOut />
      </IconButton>
    </nav>
  );
}
