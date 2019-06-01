/** @jsx jsx */
import { jsx } from "@emotion/core";
import DateModal from "components/availability/common/DateModal";
import { flexCenter } from "components/common/styles/Layout";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { transform } from "lodash";
import prepareAvailability from "components/availability/personal/PrepareAvailability";
import DayInput from "components/availability/personal/DayInput";

const PersonalAvailability = ({ login }) => {
  const [datesRange, setDatesRange] = useState({ from: null, to: null });
  const [availability, setAvailability] = useState({});

  // get user information
  useEffect(() => {
    if (login.state.userLoggedIn) login.fetchUserInfo();
  }, [login]);

  // generate basic dates before users inputs custom ones
  useEffect(() => {
    const daysAhead = login.state.priority_days_ahead || 5;
    const from = new Date();
    const to = addDays(from, daysAhead);
    setDatesRange({ from, to });
  }, [login.state.priority_days_ahead]);

  // fetch or create availability based on dates selected
  useEffect(() => {
    const { agent, id, hour_count, interval, start_hour } = login.state;
    prepareAvailability(
      agent,
      id,
      datesRange,
      start_hour,
      hour_count,
      interval
    ).then(updatedAvailability => setAvailability(updatedAvailability));
  }, [datesRange, login.state]);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <DateModal
        from={datesRange.from}
        to={datesRange.to}
        updateParent={setDatesRange}
      />
      <div css={flexCenter}>
        {transform(
          availability,
          (result, dayAvailability, day) => {
            result.push(<DayInput day={day} availability={dayAvailability} />);
          },
          []
        )}
      </div>
    </div>
  );
};

export default PersonalAvailability;
