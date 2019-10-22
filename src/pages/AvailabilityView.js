import Availability from "store/availability";
import facepaint from "facepaint";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import DayInputContainer from "components/DayInputContainer";

export default function AvailabilityView() {
  const { state } = Availability.useContainer();

  const mq = facepaint(
    ["@media(min-width: 0px)", "@media(min-width: 1400px)"],
    { literal: true }
  );

  const mobileFlexDirection = mq({
    flexDirection: ["column", "row"]
  });

  return (
    <main
      css={[
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        mobileFlexDirection
      ]}
    >
      {state.items.map(day => (
        <DayInputContainer day={day} />
      ))}
    </main>
  );
}
