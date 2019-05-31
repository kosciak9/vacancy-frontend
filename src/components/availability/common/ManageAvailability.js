/// This file is purely interacting with API
/// So no unit test required...

/* istanbul ignore next */
const fetchAvailability = (agent, player, date, time) => {
  return new Promise(resolve => {
    agent
      .get("/api/v1/availability/", { params: { time, player, date } })
      .then(response => {
        resolve(response.data[0]);
      });
  });
};

/* istanbul ignore next */
const updateAvailability = (agent, id, available) => {
  return new Promise(resolve => {
    agent.patch(`/api/v1/availability/${id}/`, { available }).then(response => {
      resolve(response.data[0]);
    });
  });
};

/* istanbul ignore next */
const createAvailability = (agent, player, date, time, available) => {
  return new Promise(resolve => {
    agent
      .post(`/api/v1/availability/`, { time, player, date, available })
      .then(response => {
        resolve(response.data[0]);
      });
  });
};

export { createAvailability, updateAvailability, fetchAvailability };
