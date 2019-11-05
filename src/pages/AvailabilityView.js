import Availability, { availabilityTypes } from "store/availability";
import facepaint from "facepaint";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import DayInputContainer from "components/DayInputContainer";
import { Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "common/datepicker.css";
import { MoonLoader } from "react-spinners";
import theme from "common/theme";
import { Calendar } from "react-feather";

export default function AvailabilityView() {
  const { state, dispatch } = Availability.useContainer();

  const mq = facepaint(
    ["@media(min-width: 0px)", "@media(min-width: 1400px)"],
    { literal: true }
  );

  const mobileFlexDirection = mq({
    flexDirection: ["column", "row"]
  });

  return (
    <Fragment>
      <aside
        css={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Calendar size={32} />
        <DatePicker
          calendarClassName="vacancy-picker"
          css={theme => ({
            height: 24,
            boxSizing: "border-box",
            borderRadius: 2,
            border: "1px solid rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            margin: theme.spacing(1),
            fontWeight: "bold",
            fontSize: "1.2em",
            width: 150,
            padding: theme.spacing(4)
          })}
          selected={new Date(state.query.start_date)}
          onChange={date =>
            dispatch({
              type: availabilityTypes.UPDATE_QUERY,
              payload: { date }
            })
          }
        />
        {state.unfetched && (
          <MoonLoader
            sizeUnit={"px"}
            size={20}
            color={theme.palette.primary}
            css={theme => ({ margin: theme.spacing(2) })}
          />
        )}
      </aside>
      <main
        css={theme => ({
          marginTop: theme.spacing(4),
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          ...mobileFlexDirection
        })}
      >
        {state.items.map(day => (
          <DayInputContainer key={day.date} day={day} />
        ))}
      </main>
    </Fragment>
  );
}
