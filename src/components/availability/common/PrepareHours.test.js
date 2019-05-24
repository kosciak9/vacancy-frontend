import { returnTeamHours } from "components/availability/common/PrepareHours";
import { differenceInMinutes } from "date-fns";

describe("returnTeamHours", () => {
  it("should generate 10 hours, one per 1.5h when provided with proper input", () => {
    const startDate = new Date(new Date().setHours(8, 30, 0, 0));
    const interval = "01:30:00";
    const hourCount = 10;
    const teamHours = returnTeamHours(startDate, interval, hourCount);

    // define variables for assertions
    const firstTeamHour = teamHours[0];
    const lastTeamHour = teamHours[teamHours.length - 1];
    const difference = differenceInMinutes(
      lastTeamHour,
      teamHours[teamHours.length - 2]
    );
    expect(teamHours).toHaveLength(10);
    expect(firstTeamHour).toEqual(startDate);
    expect(lastTeamHour).toEqual(new Date(new Date().setHours(22, 0, 0, 0)));
    expect(difference).toEqual(90);
  });
});
