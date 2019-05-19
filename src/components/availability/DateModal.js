/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { Fragment } from "react";
import Modal from "react-modal";
import DayPicker, { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import "components/common/styles/DatePicker.css";
import SVGButton from "components/common/SVGButton";

const DateModal = ({ updateParent, from, to }) => {
  // a11y - screen readers will acknowledge the modal's content
  if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

  const [hoursRange, setHoursRange] = useState({ from, to });
  const modifiers = { start: hoursRange.from, end: hoursRange.to };
  const monthsCount = Math.floor(window.innerWidth / 300) - 1;

  const [modalState, setModalState] = useState(false);
  const handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, hoursRange);
    setHoursRange(range);
  };

  return (
    <Fragment>
      <div
        className="DateModal-Result"
        onClick={() => setModalState(state => !state)}
      >
        {"Selected Date Range: "}
        {dateFnsFormat(hoursRange.from, "DD.MM.YYYY")}
        {" to "}
        {dateFnsFormat(hoursRange.to, "DD.MM.YYYY")}
      </div>
      <Modal
        isOpen={modalState}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          setModalState(false);
        }}
        style={{
          content: {
            top: "100px",
            // left: "auto",
            // right: "auto",
            bottom: "auto",
            border: "none",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)"
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
            numberOfMonths={monthsCount || 1} // if mobile, show one month only
            className="AvailabilityRange"
            onDayClick={handleDayClick}
            modifiers={modifiers}
            selectedDays={[
              hoursRange.from,
              { from: hoursRange.from, to: hoursRange.to }
            ]}
          />
          <SVGButton
            onClick={() => {
              updateParent(hoursRange);
              setModalState(false);
            }}
            height={60}
            width={120}
          >
            <span css={{ fontSize: "1.4em" }}>Submit</span>
          </SVGButton>
        </div>
      </Modal>
    </Fragment>
  );
};

export default DateModal;
