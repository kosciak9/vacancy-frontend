/** @jsx jsx */
import { jsx } from "@emotion/core";
import axios from "axios";

const changeAvailability = async (id, available) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`http://localhost:8001/v1/availability/${id}/`, { available })
      .then(resolve())
      .catch(reject());
  });
};

const HourInput = ({ hour, updateAvailability }) => {
  return (
    <div
      css={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}
    >
      {hour.time.substr(0, 5)}
      <input
        type="checkbox"
        checked={hour.available}
        onChange={event =>
          changeAvailability(hour.id, event.target.checked).then(
            updateAvailability()
          )
        }
      />
    </div>
  );
};

export { changeAvailability };
export default HourInput;
