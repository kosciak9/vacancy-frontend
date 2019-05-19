/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import { Fragment } from "react";
import Modal from "react-modal";
// @ts-ignore
import DayPicker, { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import "components/common/styles/DatePicker.css";
import SVGButton from "components/common/SVGButton";
import { InputOrange } from "components/common/styles/Colors";
import { flexCenterColumn } from "components/common/styles/Layout";
import { isTSTypeOperator } from "@babel/types";

const DateInput = css([flexCenterColumn], {
  "> *": { margin: 10 },
  cursor: "pointer",
  marginTop: 15,
  marginBottom: 15
});

const HourSpan = css({
  borderBottom: `1px solid ${InputOrange}`,
  fontSize: `1.2em`,
  fontWeight: 700
});

const DateModal = ({ updateParent, from = null, to = null }) => {
  // a11y - screen readers will acknowledge the modal's content
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

  const [hoursRange, setHoursRange] = useState({ from, to });
  const modifiers = { start: hoursRange.from, end: hoursRange.to };
  const monthsCount = Math.floor(window.innerWidth / 300) - 1;

  const [modalOpened, setModalOpened] = useState(false);
  const toggleModal = () => setModalOpened(isOpened => !isOpened);
  const handleDayClick = day => {
    // @ts-ignore
    const range = DateUtils.addDayToRange(day, hoursRange);
    setHoursRange(range);
  };

  return (
    <Fragment>
      <div css={DateInput} className="DateModal-Result" onClick={toggleModal}>
        <div>
          <span css={HourSpan}>
            {dateFnsFormat(hoursRange.from, "DD.MM.YYYY")}
          </span>
          {" to "}
          <span css={HourSpan}>
            {dateFnsFormat(hoursRange.to, "DD.MM.YYYY")}
          </span>
        </div>
        <SVGButton
          width={150}
          height={30}
          additionalCss={{ cursor: "pointer" }}
        >
          Change
        </SVGButton>
      </div>
      <Modal
        isOpen={modalOpened}
        shouldCloseOnOverlayClick={true}
        onRequestClose={toggleModal}
        style={{
          content: {
            top: "100px",
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
              toggleModal();
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
