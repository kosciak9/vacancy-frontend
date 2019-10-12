/** @jsx jsx */
import { jsx } from "@emotion/core";
import theme from "common/theme";
import IconButton from "components/IconButton";
import NavigationLink from "components/NavigationLink";
import { Toolbar, ToolbarItem, useToolbarState } from "reakit/Toolbar";
import { LogOut } from "react-feather";

export default function NavigationBar() {
  const toolbar = useToolbarState({ loop: true });
  return (
    <Toolbar
      {...toolbar}
      aria-label="My toolbar"
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
      <NavigationLink href="/personal">
        <ToolbarItem {...toolbar} as={"span"}>
          Your availability
        </ToolbarItem>
      </NavigationLink>
      <NavigationLink href="/team">
        <ToolbarItem {...toolbar} as={"span"}>
          Team availability
        </ToolbarItem>
      </NavigationLink>
      <NavigationLink href="/personal/settings">
        <ToolbarItem {...toolbar} as={"span"}>
          Personal settings
        </ToolbarItem>
      </NavigationLink>
      <NavigationLink href="/team/settings">
        <ToolbarItem {...toolbar} as={"span"}>
          Team settings
        </ToolbarItem>
      </NavigationLink>
      <IconButton color={theme.palette.warning} aria-label="logout">
        <ToolbarItem {...toolbar} as={"span"}>
          <LogOut />
        </ToolbarItem>
      </IconButton>
    </Toolbar>
  );
}
