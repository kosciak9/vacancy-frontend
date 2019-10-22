/** @jsx jsx */
import { jsx } from "@emotion/core";

export default function DaySummary({ missingPlayers }) {
  return (
    <div>
      <h1 css={theme => theme.typography.h5}>
        Availability missing:
        <span
          css={theme => ({
            backgroundColor: missingPlayers.length
              ? theme.palette.invalid
              : theme.palette.success,
            marginLeft: theme.spacing(1),
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            display: "inline-block"
          })}
        >
          {missingPlayers.length}
        </span>
      </h1>
      <ul>
        {missingPlayers.map(player => (
          <li key={player.id}>
            {player.kit_number}. {player.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
