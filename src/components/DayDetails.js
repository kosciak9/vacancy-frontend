/** @jsx jsx */
import { jsx } from "@emotion/core";
import { get, groupBy, toPairs } from "lodash";
import { format, parseISO } from "date-fns";

export default function DayDetails({ players, availabilities }) {
  const groupedByHour = toPairs(
    groupBy(availabilities, el => format(parseISO(el.from), "HH:mm"))
  )
    .sort((a, b) => a[0] > b[0])
    .map(el => ({ hour: el[0], availabilities: el[1] }));

  return (
    <ul>
      {groupedByHour.map(hour => (
        <li key={hour.hour}>
          {hour.hour}
          <ul>
            {hour.availabilities.map(av => (
              <li
                key={av.id}
                css={theme => ({
                  textDecoration: av.available ? null : "line-through",
                  color: av.available
                    ? av.uncertain
                      ? theme.palette.warning
                      : theme.palette.success
                    : av.uncertain
                    ? theme.palette.warning
                    : theme.palette.invalid
                })}
              >
                {get(players, `${av.player_id}.kit_number`, "kitNumberLoading")}
                . {get(players, `${av.player_id}.name`, "nameLoading")}
                {av.uncertain && " (%)"}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
