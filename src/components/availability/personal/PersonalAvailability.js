/** @jsx jsx */
import { jsx } from "@emotion/core";

import DateModal from "components/availability/common/DateModal";
import DayInput from "components/availability/personal/DayInput";
import fetchAvailability from "components/availability/common/FetchAvailability";

import { eachDay, format } from "date-fns";
import { find, each, mapValues, values } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { flexCenter } from "components/common/styles/Layout";

const fetchPersonalAvailability = async (
  agent,
  user,
  hoursRange,
  setAvailability
) => {
  await setAvailability({});
  each(eachDay(hoursRange.from, hoursRange.to), async date => {
    const formattedDate = format(date, "YYYY-MM-DD");
    const availability = await fetchAvailability(
      user,
      formattedDate,
      setAvailability,
      agent
    );
    await setAvailability(state => {
      return { ...state, [formattedDate]: availability };
    });
  });
};

const AvailabilityContainer = ({ login }) => {
  const [hoursRange, setHoursRange] = useState({ from: null, to: null });
  const [availability, setAvailability] = useState({});
  const changeAvailability = useCallback(
    async (date, id, value) => {
      await setAvailability(state => {
        const availabilityToChange = find(
          availability[date],
          element => element.id === id
        );
        availabilityToChange.available = value;
        return state;
      });
      await login.state.agent.patch(`/api/v1/availability/${id}/`, {
        available: value
      });
    },
    [login.state.agent, availability]
  );
  useEffect(() => {
    login.fetchUserInfo();
    fetchPersonalAvailability(
      login.state.agent,
      login.state.user,
      hoursRange,
      setAvailability
    );
  }, [hoursRange, login]);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <DateModal updateParent={setHoursRange} />
      {JSON.stringify(login.state)}
      <div css={flexCenter}>
        {values(
          mapValues(availability, (availability, day) => (
            <DayInput
              key={day}
              day={day}
              availability={availability}
              changeAvailability={changeAvailability}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AvailabilityContainer;
