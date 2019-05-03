/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import axios from "axios";
// import { findIndex } from "lodash";
import { forIn } from "lodash";
import DayContainer from "../DayContainer";

const getPriorityAvailability = async () => {
  const response = await axios.get("http://localhost:8001/v1/priority/");
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
      <DayContainer
        key={day}
        day={day}
        availability={availability}
        updateAvailability={updateAvailability}
      />
    );
  });
  return children;
};

export default AvailabilityContainer;
