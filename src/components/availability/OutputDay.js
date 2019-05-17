/** @jsx jsx */
import { jsx } from "@emotion/core";
import { format } from "date-fns";
import { forIn, values } from "lodash";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { InputBackground } from "components/common/styles/Colors";

const OutputDay = ({ day, hours, captain }) => {
  const formattedDay = format(new Date(day), "ddd, DD.MM");
  const columns = [{ Header: "Player", accessor: "player", minWidth: 180 }];
  const data = {};

  forIn(hours, (availabilities, time) => {
    columns.push({ Header: time.substr(0, 5), accessor: time, minWidth: 70 });
    forIn(availabilities, hour => {
      if (!data[hour.player])
        data[hour.player] = { player: captain.getPlayerName(hour.player) };
      data[hour.player][hour.time] = hour.available ? "✓" : "⨯";
    });
  });

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        padding: 20,
        backgroundColor: InputBackground,
        marginBottom: 20
      }}
    >
      <h2>{formattedDay}</h2>
      <ReactTable
        showPagination={false}
        minRows={0}
        columns={columns}
        data={values(data)}
      />
    </div>
  );
};

export default OutputDay;
