import { sortBy } from "lodash";

const fetchAvailability = (player, date, setState, agent) => {
  return new Promise(resolve => {
    agent
      .get("/api/v1/availability/", { params: { player, date } })
      .then(response => {
        const availability = sortBy(response.data, ["hour"]);
        resolve(availability);
      });
  });
};

export default fetchAvailability;
