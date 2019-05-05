/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import axios from "axios";
// import { findIndex } from "lodash";
import { forIn } from "lodash";
import CaptainDayContainer from "../CaptainDayContainer";

const getTeamAvailability = async () => {
  const response = await axios.get("/v1/priority/team/");
  const state = {};
  for (let i = 0; i < response.data.length; i++) {
    const date = response.data[i].date;
    const availability = response.data[i].availability;
    state[date] = availability;
  }
  return state;
};

const CaptainContainer = () => {
  const [availability, setAvailability] = useState({});
  const updateAvailability = () => {
    getTeamAvailability().then(update => setAvailability(update));
  };
  useEffect(() => updateAvailability(), []);
  const children = [];
  forIn(availability, (hours, day) => {
    children.push(<CaptainDayContainer key={day} hours={hours} day={day} />);
  });
  return <main css={{ paddingTop: 100 }}>{children}</main>;
};

export default CaptainContainer;
