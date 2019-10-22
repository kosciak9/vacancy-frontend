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
          <span
            css={theme => ({
              backgroundColor: theme.palette.warning,
              borderRadius: 2,
              paddingLeft: theme.spacing(1),
              paddingRight: theme.spacing(1)
            })}
          >
            {hour.hour} - {availabilities.length} players
          </span>
          <ul>
            {hour.availabilities.map(av => (
              <li key={av.id}>
                {get(players, `${av.player_id}.kit_number`, "kitNumberLoading")}
                . {get(players, `${av.player_id}.name`, "nameLoading")}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
