import Availability, { availabilityTypes } from "store/availability";
import facepaint from "facepaint";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import DayInputContainer from "components/DayInputContainer";
import { Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MoonLoader } from "react-spinners";
import theme from "common/theme";

export default function AvailabilityView() {
  const { state, dispatch } = Availability.useContainer();

  const mq = facepaint(
    ["@media(min-width: 0px)", "@media(min-width: 1400px)"],
    { literal: true }
  );

  const mobileFlexDirection = mq({
    flexDirection: ["column", "row"]
  });

  console.log(state.query);

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
        <DatePicker
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
