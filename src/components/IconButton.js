/** @jsx jsx */
import { Fragment } from "react";
import { jsx } from "@emotion/core";
import { Button, TooltipReference, Tooltip, useTooltipState } from "reakit";
import { darken, getContrast } from "polished";

export default function IconButton(props) {
  const { color, message, children } = props;
  const tooltip = useTooltipState();
  return (
    <Fragment>
      <TooltipReference
        {...tooltip}
        as={Button}
        css={theme => ({
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          padding: theme.spacing(1),
          border: "1px solid rgba(0, 0, 0, 0.3)",
          borderRadius: 2,
          backgroundColor: color,
          color:
            getContrast(color, "white") > getContrast(color, "black")
              ? "white"
              : "black",
          "&:hover": {
            backgroundColor: darken(0.3, color)
          },
          margin: theme.spacing(2)
        })}
        {...props}
      >
        {children}
      </TooltipReference>
      <Tooltip
        {...tooltip}
        css={theme => ({
          border: "1px solid black",
          backgroundColor: theme.palette.backdrop,
          padding: theme.spacing(3)
        })}
      >
        {message}
      </Tooltip>
    </Fragment>
  );
}
