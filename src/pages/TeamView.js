/** @jsx jsx */
import { jsx } from "@emotion/core";
import TeamOverview from "store/teamOverview";
import DayOutputContainer from "components/DayOutputContainer";

export default function TeamView() {
  const { state } = TeamOverview.useContainer();
  return (
    <main css={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {state.items.map(day => (
        <DayOutputContainer
          players={state.players.items}
          key={day.date}
          date={day.date}
          availabilities={day.availabilities}
          missingPlayers={day.missing_players}
        />
      ))}
    </main>
  );
}
