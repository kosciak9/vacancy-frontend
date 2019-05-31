/** @jsx jsx */
import { jsx } from "@emotion/core";
import { buttonGroup, flexCenter } from "components/common/styles/Layout";

const HourInput = ({
  hour = { time: "error", available: false },
  changeAvailability
}) => {
  return (
    <div
      css={[
        flexCenter,
        {
          justifyContent: "space-between",
          width: "100%",
          marginTop: 10
        }
      ]}
    >
      <span>{hour.time.substr(0, 5)}</span>
      <input
        type="checkbox"
        checked={hour.available}
        onChange={event =>
          changeAvailability(hour.date, hour.id, event.target.checked)
        }
      />
    </div>
  );
};

export default HourInput;
