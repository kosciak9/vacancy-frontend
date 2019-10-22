import TeamSettingsForm from "components/TeamSettingsForm";
import TeamSettingsGroupManager from "components/TeamSettingsTemplateGroupManager";
import facepaint from "facepaint";
/** @jsx jsx */
import { jsx } from "@emotion/core";

export default function TeamSettingsView() {
  const mq = facepaint(
    ["@media(min-width: 0px)", "@media(min-width: 1400px)"],
    { literal: true }
  );

  const mobileFlexDirection = mq({
    flexDirection: ["column", "row"]
  });

  return (
    <main
      css={theme => [
        {
          display: "flex",
          alignItems: "flex-start",
          padding: theme.spacing(4)
        },
        mobileFlexDirection
      ]}
    >
      <TeamSettingsForm />
      <TeamSettingsGroupManager />
    </main>
  );
}
