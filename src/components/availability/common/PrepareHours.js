import { format, addHours, addMinutes } from "date-fns";

const returnTeamHours = (startDate, interval, amount) => {
  const teamHours = [];
  const hours = Number(interval.substr(0, 2));
  const minutes = Number(interval.substr(3, 2));
  let iterator = new Date(startDate);
  for (let i = 0; i < amount; i++) {
    teamHours.push(new Date(iterator));
    iterator = addHours(iterator, hours);
    iterator = addMinutes(iterator, minutes);
  }
  return teamHours;
};

export { returnTeamHours };
