/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Button } from "reakit";
import { darken, getContrast } from "polished";

export default function IconButton(props) {
  const { color, children } = props;
  return (
    <Button
      css={theme => ({
        // padding: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        border: "none",
        height: 40,
        borderRadius: 0,
        backgroundColor: color,
        color:
          getContrast(color, "white") > getContrast(color, "black")
            ? "white"
            : "black",
        "&:hover": {
          backgroundColor: darken(0.3, color)
        }
      })}
      {...props}
    >
      {children}
    </Button>
  );
}
