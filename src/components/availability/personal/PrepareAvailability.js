import {
  returnTeamHours,
  returnTimeObject
} from "components/availability/common/PrepareHours";
import { createOnUndefined } from "components/availability/common/ManageAvailability";
import {
  format,
  eachDay,
  setHours,
  setMinutes,
  setMilliseconds
} from "date-fns";

const prepareAvailability = async (
  agent,
  id,
  datesRange,
  startHour,
  hourCount,
  interval
) => {
  const availability = {};
  const { hours, minutes } = returnTimeObject(startHour || "08:30:00");
  const dates = eachDay(datesRange.from, datesRange.to);
  for (let i = 0; i < dates.length; i++) {
    const formattedDate = format(dates[i], "YYYY-MM-DD");
    availability[formattedDate] = [];
    const startDate = setMilliseconds(
      setMinutes(setHours(dates[i], hours), minutes),
      0
    );
    const teamHours = returnTeamHours(startDate, interval, hourCount);
    for (let j = 0; j < teamHours.length; j++) {
      const formattedTime = format(teamHours[j], "HH:mm:00");
      const availabilityInstance = await createOnUndefined(
        agent,
        id,
        formattedDate,
        formattedTime
      );
      availability[formattedDate].push(availabilityInstance);
    }
  }
  return availability;
};

export default prepareAvailability;
