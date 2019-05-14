/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import Modal from "react-modal";
import DayPicker, { DateUtils } from "react-day-picker";
// import DayPickerInput from "react-day-picker/DayPickerInput";
import "components/common/styles/DatePicker.css";
import SVGButton from "components/common/SVGButton";
// import InputDayContainer from "components/availability/InputDayContainer";
// import { useEffect, useState } from "react";
// import { forIn } from "lodash";
// Modal.setAppElement("#root");

const AvailabilityContainer = ({ client }) => {
  const [modalState, setModalState] = useState(false);
  const [hoursRange, setHoursRange] = useState({ from: null, to: null });
  const monthsCount = window.innerWidth < 768 ? 1 : 3; // if mobile, show one month only

  const handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, hoursRange);
    setHoursRange(range);
  };

  const modifiers = { start: hoursRange.from, end: hoursRange.to };
  // const [availability, setAvailability] = useState({});
  // const updateAvailability = () => {
  //   getPriorityAvailability().then(update => setAvailability(update));
  // };
  // useEffect(() => updateAvailability(), []);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Modal
        isOpen={modalState}
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            top: "100px",
            // left: "auto",
            // right: "auto",
            bottom: "auto",
            border: "none",
            boxShadow: "1px 3px 3px rgba(0, 0, 0, 0.3)"
          }
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <DayPicker
            numberOfMonths={monthsCount}
            className="AvailabilityRange"
            onDayClick={handleDayClick}
            modifiers={modifiers}
            selectedDays={[
              hoursRange.from,
              { from: hoursRange.from, to: hoursRange.to }
            ]}
          />
          <SVGButton
            onClick={() => setModalState(state => !state)}
            height={60}
            width={120}
          >
            <span css={{ fontSize: "1.4em" }}>Submit</span>
          </SVGButton>
        </div>
      </Modal>
      <div onClick={() => setModalState(state => !state)}>
        {JSON.stringify(hoursRange)}
      </div>
    </div>
  );
};

export default AvailabilityContainer;
