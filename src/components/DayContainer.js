/** @jsx jsx */
import { jsx } from "@emotion/core";
import IconButton from "components/IconButton";
import { Copy, XCircle, CheckCircle } from "react-feather";
import theme from "common/theme";
import DotIndicator from "components/DotIndicator";

export default function DayContainer() {
  const date = new Date();
  const day = {
    date,
    filled: false,
    availability: [
      {
        date,
        time: "08:30:00",
        available: false
      },
      {
        date,
        time: "10:00:00",
        available: false
      },
      {
        date,
        time: "11:30:00",
        available: false
      },
      {
        date,
        time: "13:00:00",
        available: false
      },
      {
        date,
        time: "14:30:00",
        available: false
      },
      {
        date,
        time: "16:00:00",
        available: false
      }
    ]
  };
  return (
    <section
      css={theme => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 200,
        backgroundColor: theme.palette.backdrop
      })}
    >
      <h1 css={theme => theme.typography.h4}>
        Mon, 21.03
        <DotIndicator
          success={day.filled}
          failure={!day.filled}
          message={
            day.filled
              ? "This day is already completed"
              : "Please input your availability"
          }
        />
      </h1>
      <div
        css={theme => ({
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          padding: theme.spacing(2)
        })}
      >
        <IconButton color={theme.palette.primary}>
          <Copy size={24} />
        </IconButton>
        <IconButton color={theme.palette.success}>
          <CheckCircle size={24} />
        </IconButton>
        <IconButton color={theme.palette.invalid}>
          <XCircle size={24} />
        </IconButton>
      </div>
    </section>
  );
}
