import { set } from "date-fns";

const getNextMonday = () => {
  const d = new Date();
  return set(new Date(d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7))), {
    hours: 1,
    minutes: 0,
    seconds: 0
  }).toISOString();
};

export { getNextMonday };
