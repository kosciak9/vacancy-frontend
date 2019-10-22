/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment, useState } from "react";
import { Plus } from "react-feather";
import Login from "store/login";
import TeamSettings, { teamSettingsTypes } from "store/teamSettings";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import DropdownSelect from "components/DropdownSelect";
import wretch from "wretch";
import TimeField from "react-simple-timefield";
import { setHours, setMinutes, setSeconds } from "date-fns";

export default function AddTemplateDialog({ teamId, templateGroupId }) {
  const dialog = useDialogState();
  const weekdays = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" }
  ];
  const [weekday, setWeekday] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { login } = Login.useContainer();
  const { dispatch } = TeamSettings.useContainer();

  const postTemplate = async () => {
    const [fromHours, fromMinutes] = from.split(":");
    const [toHours, toMinutes] = to.split(":");
    const fromDate = setSeconds(
      setMinutes(setHours(new Date("2000-01-01"), fromHours), fromMinutes),
      0
    );
    const toDate = setSeconds(
      setMinutes(setHours(new Date("2000-01-01"), toHours), toMinutes),
      0
    );

    try {
      await wretch(`/team/${teamId}/template_group/${templateGroupId}/template`)
        .auth(login.token)
        .post({
          from: fromDate.toISOString(),
          to: toDate.toISOString(),
          weekday: weekday.id
        })
        .json();
      dispatch({ type: teamSettingsTypes.REFRESH_TEMPLATES });
      dialog.hide();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Fragment>
      <DialogDisclosure
        {...dialog}
        css={theme => ({
          ...theme.typography.content,
          margin: theme.spacing(2),
          border: `1px solid rgba(0, 0, 0, 0.3)`,
          borderRadius: 2,
          padding: theme.spacing(1),
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center"
        })}
      >
        Add new template <Plus size={20} />
      </DialogDisclosure>
      <Dialog
        {...dialog}
        aria-label="Welcome"
        css={theme => ({
          position: "fixed",
          left: "calc(50% - 200px)",
          top: 100,
          width: 400,
          backgroundColor: theme.palette.backdrop,
          borderRadius: 2,
          border: "1px solid black",
          boxShadow: "1px 1px 5px 5px rgba(0, 0, 0, 0.3)",
          padding: theme.spacing(2),
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        })}
      >
        <h1 css={theme => theme.typography.h4}>Create new template</h1>
        <DropdownSelect
          label="Select weekday"
          items={weekdays}
          onChange={setWeekday}
          value={weekday}
        />
        <div css={{ display: "flex", flexDirection: "column" }}>
          <p>From:</p>
          <TimeField
            css={theme => ({
              ...theme.typography.content,
              minWidth: 100,
              textAlign: "center"
            })}
            value={from}
            onChange={(_event, value) => setFrom(value)}
            colon=":"
          />
          <p>To:</p>
          <TimeField
            css={theme => ({
              ...theme.typography.content,
              minWidth: 100,
              textAlign: "center"
            })}
            value={to}
            onChange={(_event, value) => setTo(value)}
            colon=":"
          />
        </div>
        <button
          css={theme => ({
            ...theme.typography.content,
            border: "1px solid rgba(0, 0, 0, 0.3)",
            borderRadius: 2,
            backgroundColor: theme.palette.success,
            padding: theme.spacing(2),
            margin: theme.spacing(2)
          })}
          onClick={postTemplate}
        >
          Add template
        </button>
      </Dialog>
    </Fragment>
  );
}
