/** @jsx jsx */
import { jsx } from "@emotion/core";
import { format } from "date-fns";
import { forIn, values } from "lodash";
import ReactTable from "react-table";
import axios from "axios";
import "react-table/react-table.css";

const fetchPlayerName = async id => {
  try {
    const response = await axios.get(`/v1/users/${id}/`);
    const kitNumber = response.data.kit_number;
    const firstName = response.data.first_name;
    const lastName = response.data.last_name;
    return `${kitNumber}. ${firstName} ${lastName}`;
  } catch (error) {
    return id;
  }
};

const CaptainDayContainer = ({ day, hours }) => {
  const formattedDay = format(new Date(day), "ddd, DD.MM");
  const columns = [{ Header: "Player", accessor: "player" }];
  const data = {};

  forIn(hours, (availabilities, time) => {
    columns.push({ Header: time, accessor: time });
    forIn(availabilities, hour => {
      if (!data[hour.player]) data[hour.player] = { player: hour.player };
      data[hour.player][hour.time] = hour.available ? "✓" : "⨯";
    });
  });

  forIn(data, async value => {
    value.player = await fetchPlayerName(value.player);
  });

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        // width: "85%",
        padding: 20,
        backgroundColor: "rgba(217, 217, 217, 0.3)",
        margin: 5
      }}
    >
      <h2 css={{ textAlign: "center" }}>{formattedDay}</h2>
      <ReactTable
        showPagination={false}
        minRows={0}
        columns={columns}
        data={values(data)}
      />
    </div>
  );
};

export default CaptainDayContainer;
