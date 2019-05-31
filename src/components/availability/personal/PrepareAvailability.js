import { each } from "lodash";
import { returnTeamHours } from "components/availability/common/PrepareHours";
import {
  fetchAvailability,
  createAvailability
} from "components/availability/common/ManageAvailability";
import { format } from "date-fns";

const prepareAvailability = async (agent, user, hourSettings) => {
  const { startDate, interval, amount } = hourSettings;
  const hourRange = returnTeamHours(startDate, interval, amount);
  const availability = {};
  each(hourRange, async date => {
    const formattedTime = format(date, "HH:mm:00");
    const formattedDate = format(date, "YYYY-MM-DD");
    if (!availability[formattedDate]) availability[formattedDate] = [];
    let instance = await fetchAvailability(
      agent,
      user,
      formattedDate,
      formattedTime
    );
    if (!instance) {
      instance = await createAvailability(
        agent,
        user,
        formattedDate,
        formattedTime,
        false
      );
    }
    availability[formattedDate].push(instance);
  });
  return availability;
};

export default prepareAvailability;
