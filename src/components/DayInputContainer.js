import { CheckCircle, Copy, XCircle } from "react-feather";

import HourInput from "components/HourInput";
import IconButton from "components/IconButton";
import { format, parseISO } from "date-fns";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import theme from "common/theme";

export default function DayContainer({ day }) {
  return (
    <section
      css={theme => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        backgroundColor: theme.palette.backdrop,
        borderRadius: 2
      })}
    >
      <h2 css={theme => ({ ...theme.typography.h3, margin: 0 })}>
        {format(parseISO(day.date), "EEE, dd.LL")}
      </h2>
      <div
        css={theme => ({
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing(2),
          marginBottom: theme.spacing(2)
        })}
      >
        <IconButton
          color={theme.palette.primary}
          message="Clone availability from previous week"
        >
          <Copy size={24} />
        </IconButton>
        <IconButton
          color={theme.palette.success}
          message="Set all hours to 'available'"
        >
          <CheckCircle size={24} />
        </IconButton>
        <IconButton
          color={theme.palette.invalid}
          message="Set all hours to 'unavailable'"
        >
          <XCircle size={24} />
        </IconButton>
      </div>
      <main css={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {day.availabilities.map((av, index) => (
          <HourInput key={index} av={av} date={day.date} />
        ))}
      </main>
    </section>
  );
}
