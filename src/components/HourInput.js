/** @jsx jsx */
import { jsx } from "@emotion/core";
import { format } from "date-fns";
import theme from "common/theme";
import IconCheckbox from "components/IconCheckbox";
import Login from "store/login";
import wretch from "wretch";
import Availability, { availabilityTypes } from "store/availability";
import { Percent, Check, X } from "react-feather";

export default function HourInput({ av, date }) {
  const { login } = Login.useContainer();
  const { dispatch } = Availability.useContainer();
  const { token } = login;
  const updateAvailability = newAv => {
    wretch()
      .url(`/me/availability/${newAv.id}`)
      .auth(token)
      .put(newAv)
      .json()
      .then(response => {
        dispatch({
          type: availabilityTypes.UPDATE_AVAILABILITY,
          payload: {
            ...response,
            date
          }
        });
      });
  };
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
      }}
    >
      <span css={{ flexGrow: 1 }}>{format(new Date(av.from), "HH:mm")}</span>
      <IconCheckbox
        uncheckedBackground={"rgba(0, 0, 0, 0.0)"}
        checkedBackground={theme.palette.warning}
        iconUnchecked={Percent}
        iconChecked={Percent}
        checked={av.uncertain}
        onChange={() => updateAvailability({ ...av, uncertain: !av.uncertain })}
      />
      <IconCheckbox
        iconUnchecked={X}
        iconChecked={Check}
        checked={av.available}
        onChange={() => updateAvailability({ ...av, available: !av.available })}
      />
    </div>
  );
}
