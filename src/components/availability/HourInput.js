/** @jsx jsx */
import { jsx } from "@emotion/core";
import axios from "axios";
import { buttonGroup } from "components/common/styles/Layout";

const HourInput = ({ hour, changeAvailability }) => {
  return (
    <div css={[buttonGroup, { marginTop: 10 }]}>
      <span>{hour.time.substr(0, 5)}</span>
      <input
        type="checkbox"
        checked={hour.available}
        onChange={event => changeAvailability(hour.id, event.target.checked)}
      />
    </div>
  );
};

export default HourInput;
