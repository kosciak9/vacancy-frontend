/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Tooltip, TooltipReference, useTooltipState } from "reakit/Tooltip";

export default function DotIndicator({ success, failure, message }) {
  const tooltip = useTooltipState();
  return (
    <Fragment>
      <TooltipReference
        {...tooltip}
        as={"span"}
        role="img"
        css={theme => ({
          marginLeft: theme.spacing(1),
          color: success
            ? theme.palette.success
            : failure
            ? theme.palette.invalid
            : "inherit"
        })}
      >
        •
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
