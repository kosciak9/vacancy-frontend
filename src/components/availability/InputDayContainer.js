/** @jsx jsx */
import { jsx } from "@emotion/core";
import { format } from "date-fns";
import { changeAvailability } from "components/availability/HourInput";

import clone from "components/common/svgs/clone.svg";
import all from "components/common/svgs/all.svg";
import none from "components/common/svgs/none.svg";

import HourInput from "components/availability/HourInput";
import SVGButton from "components/common/SVGButton";

const turnWholeDay = (availability, updateAvailability, value) => {
  availability.map(async hour => {
    await changeAvailability(hour.id, value);
    return true;
  });
  updateAvailability();
};

const DayContainer = ({ day, availability, updateAvailability }) => {
  const formattedDay = format(new Date(day), "ddd, DD.MM");
  const children = availability.map(hour => {
    return (
      <HourInput
        hour={hour}
        key={hour.id}
        updateAvailability={updateAvailability}
      />
    );
  });

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: 200,
        padding: 20,
        backgroundColor: "rgba(217, 217, 217, 0.3)",
        margin: 5
      }}
    >
      <h2 css={{ textAlign: "center" }}>
        {formattedDay}
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20
          }}
        >
          <SVGButton
            width={36}
            height={28}
            backgroundColor={"#961FA8"}
            image={clone}
            altText={"clone previous week"}
          />
          <SVGButton
            width={36}
            height={28}
            backgroundColor={"#76A81F"}
            onClick={() => turnWholeDay(availability, updateAvailability, true)}
            image={all}
            altText="select all as possible to come"
          />
          <SVGButton
            width={36}
            height={28}
            backgroundColor={"rgba(226, 104, 60, 0.75)"}
            onClick={() =>
              turnWholeDay(availability, updateAvailability, false)
            }
            image={none}
            alt={"select all as impossible to come"}
          />
        </div>
      </h2>
      {children}
    </div>
  );
};

export default DayContainer;
