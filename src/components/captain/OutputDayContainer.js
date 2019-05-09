/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { values, transform } from "lodash";
import OutputDay from "components/captain/OutputDay";

const OutputDayContainer = ({ captain }) => {
  useEffect(() => {
    captain.getTeamAvailability();
    captain.getPlayers();
  }, [captain]);
  return transform(
    captain.state.availability,
    (accum, value, key) => {
      accum.push(
        <OutputDay day={key} hours={value} key={key} captain={captain} />
      );
    },
    []
  );
};

export default OutputDayContainer;
