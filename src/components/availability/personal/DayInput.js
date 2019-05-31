/** @jsx jsx */
import { jsx } from "@emotion/core";
import HourInput from "components/availability/personal/HourInput";
import {
  InputBackground,
  MiscAction,
  SuccessGreen,
  WarningRedWithOpacity
} from "components/common/styles/Colors";
import { buttonGroup, flexCenterColumn } from "components/common/styles/Layout";
import SVGButton from "components/common/SVGButton";
import all from "components/common/svgs/all.svg";
import clone from "components/common/svgs/clone.svg";
import none from "components/common/svgs/none.svg";
import { format } from "date-fns";

const DayInput = ({ day, availability }) => {
  const formattedDay = format(new Date(day), "ddd, DD.MM");

  return (
    <div
      css={[
        flexCenterColumn,
        {
          width: 200,
          padding: 20,
          backgroundColor: InputBackground,
          margin: 5
        }
      ]}
    >
      <h2 css={{ textAlign: "center" }}>
        {formattedDay}
        <div
          css={[
            buttonGroup,
            {
              marginTop: 20
            }
          ]}
        >
          <SVGButton
            width={36}
            height={28}
            backgroundColor={MiscAction}
            image={clone}
            altText={"clone previous week"}
          />
          <SVGButton
            width={36}
            height={28}
            backgroundColor={SuccessGreen}
            onClick={() => {}}
            image={all}
            altText="select all as possible to come"
          />
          <SVGButton
            width={36}
            height={28}
            backgroundColor={WarningRedWithOpacity}
            onClick={() => {}}
            image={none}
            alt={"select all as impossible to come"}
          />
        </div>
      </h2>
      {availability.map(hour => (
        <HourInput hour={hour} key={hour.id} changeAvailability={() => {}} />
      ))}
    </div>
  );
};

export default DayInput;
