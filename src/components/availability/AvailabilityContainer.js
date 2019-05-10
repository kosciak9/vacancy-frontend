/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { forIn } from "lodash";
import InputDayContainer from "components/availability/InputDayContainer";

const breakpoints = [400, 576, 1000, 1400];

const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
const gridTemplateColumnsCount = breakpoints.map(bp => {
  let repeatedString = "";
  let times = bp / 200;
  while (times > 0) {
    repeatedString += "1fr ";
    times--;
  }

  return repeatedString;
});

const getPriorityAvailability = async () => {
  const response = await axios.get("/api/v1/priority/");
  const state = {};
  for (let i = 0; i < response.data.length; i++) {
    const date = response.data[i].date;
    const availability = response.data[i].availability;
    state[date] = availability;
  }
  return state;
};

const AvailabilityContainer = () => {
  const [availability, setAvailability] = useState({});
  const updateAvailability = () => {
    getPriorityAvailability().then(update => setAvailability(update));
  };
  useEffect(() => updateAvailability(), []);
  const children = [];
  forIn(availability, (availability, day) => {
    children.push(
      <InputDayContainer
        key={day}
        day={day}
        availability={availability}
        updateAvailability={updateAvailability}
      />
    );
  });
  return (
    <main
      css={{
        paddingTop: 100,
        width: "100%",
        display: "grid",
        justifyItems: "center",
        [mq[0]]: {
          gridTemplateColumns: gridTemplateColumnsCount[0]
        },
        [mq[1]]: {
          gridTemplateColumns: gridTemplateColumnsCount[1]
        },
        [mq[2]]: {
          gridTemplateColumns: gridTemplateColumnsCount[2]
        },
        [mq[3]]: {
          gridTemplateColumns: gridTemplateColumnsCount[3]
        }
      }}
    >
      {children}
    </main>
  );
};

export default AvailabilityContainer;
