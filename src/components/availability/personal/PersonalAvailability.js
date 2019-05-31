/** @jsx jsx */
import { jsx } from "@emotion/core";
import DateModal from "components/availability/common/DateModal";
import DayInput from "components/availability/personal/DayInput";
import { flexCenter } from "components/common/styles/Layout";
import { mapValues, values } from "lodash";
import { useEffect, useState } from "react";

const AvailabilityContainer = ({ login }) => {
  const [hoursRange, setHoursRange] = useState({ from: null, to: null });
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    if (login.state.userLoggedIn) login.fetchUserInfo();
  }, [login]);

  // useEffect(() => {
  //   const startHour = login.state.start_hour || "08:00:00";
  //   const { hours, minutes } = returnTimeObject(startHour);
  //   setAvailability({});
  //   const dayRange = eachDay(hoursRange.from, hoursRange.to);
  //   each(dayRange, day => {
  //     const iterationDay = setMilliseconds(
  //       setMinutes(setHours(day, hours), minutes),
  //       0
  //     );
  //     prepareAvailability(login.state.agent, login.state.id, {
  //       iterationDay,
  //       interval: login.state.interval,
  //       amount: login.state.hour_count
  //     }).then(availabilityInstance =>
  //       setAvailability({ ...availability, availabilityInstance })
  //     );
  //   });
  // }, [login.state, hoursRange.from, hoursRange.to]);

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
        login={login}
        from={hoursRange.from}
        to={hoursRange.to}
        updateParent={setHoursRange}
      />
      <div css={flexCenter}>
        {values(
          mapValues(availability, (availability, day) => (
            <DayInput key={day} day={day} availability={availability} />
          ))
        )}
      </div>
    </div>
  );
};

export default AvailabilityContainer;
