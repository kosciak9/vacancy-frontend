/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import DateModal from "components/availability/DateModal";

const AvailabilityContainer = ({ client }) => {
  const [hoursRange, setHoursRange] = useState({ from: null, to: null });
  // const [availability, setAvailability] = useState({});
  // TODO: availability fetching

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
      {JSON.stringify(hoursRange)}
    </div>
  );
};

export default AvailabilityContainer;
