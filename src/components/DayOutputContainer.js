import { format, parseISO } from "date-fns";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";
import DaySummary from "components/DaySummary";
import DayDetails from "components/DayDetails";

export default function DayOutputContainer({
  players,
  date,
  availabilities,
  missingPlayers
}) {
  const tab = useTabState({ selectedId: "summary" });
  return (
    <div
      css={theme => ({
        backgroundColor: theme.palette.backdrop,
        margin: theme.spacing(2),
        width: `calc(100% - ${theme.spacing(2)}px)`,
        padding: theme.spacing(2),
        boxSizing: "border-box"
      })}
    >
      <header
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1 css={theme => theme.typography.h4}>
          {format(parseISO(date), "EEE, dd.MM")}
        </h1>
        <TabList {...tab} aria-label="My tabs">
          <Tab {...tab} stopId="summary">
            Summary
          </Tab>
          <Tab {...tab} stopId="details">
            Details
          </Tab>
        </TabList>
      </header>
      <TabPanel {...tab} stopId="summary">
        <DaySummary missingPlayers={missingPlayers} />
      </TabPanel>
      <TabPanel {...tab} stopId="details">
        <DayDetails players={players} availabilities={availabilities} />
      </TabPanel>
    </div>
  );
}
