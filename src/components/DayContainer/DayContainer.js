/** @jsx jsx */
import { jsx } from "@emotion/core";
import { format } from "date-fns";
import { changeAvailability } from "../HourInput/HourInput";

import clone from "./clone.svg";
import all from "./all.svg";
import none from "./none.svg";
// import maybe from "./percent.svg";
// import tick from "./tick.svg";

import HourInput from "../HourInput";

const ButtonStyle = {
  width: 36,
  height: 28,
  border: "none"
};

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
        {
          //<span css={{ color: "red" }}>·</span>
        }
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20
          }}
        >
          <button css={{ ...ButtonStyle, backgroundColor: "#961FA8" }}>
            <img
              src={clone}
              alt="clone previous week"
              css={{ display: "block", margin: "auto" }}
            />
          </button>
          <button
            css={{ ...ButtonStyle, backgroundColor: "#76A81F" }}
            onClick={() => turnWholeDay(availability, updateAvailability, true)}
          >
            <img
              src={all}
              alt="select all as possible to come"
              css={{ display: "block", margin: "auto" }}
            />
          </button>
          <button
            css={{
              ...ButtonStyle,
              backgroundColor: "rgba(226, 104, 60, 0.75)"
            }}
            onClick={() =>
              turnWholeDay(availability, updateAvailability, false)
            }
          >
            <img
              src={none}
              alt="select all as impossible to come"
              css={{ display: "block", margin: "auto" }}
            />
          </button>
        </div>
      </h2>
      {children}
    </div>
  );
};

export default DayContainer;
