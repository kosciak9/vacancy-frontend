import { addHours, addMinutes } from "date-fns";

const returnTimeObject = (time = "00:00:00") => {
  const hours = Number(time.substr(0, 2));
  const minutes = Number(time.substr(3, 2));
  return { hours, minutes };
};

const returnTeamHours = (startDate, interval, amount) => {
  const teamHours = [];
  const { hours, minutes } = returnTimeObject(interval);
  let iterator = new Date(startDate);
  for (let i = 0; i < amount; i++) {
    teamHours.push(new Date(iterator));
    iterator = addHours(iterator, hours);
    iterator = addMinutes(iterator, minutes);
  }
  return teamHours;
};

export { returnTeamHours, returnTimeObject };
