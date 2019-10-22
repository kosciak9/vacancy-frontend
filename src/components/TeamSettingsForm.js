import {
  unstable_Form as Form,
  unstable_FormInput as FormInput,
  unstable_FormLabel as FormLabel,
  unstable_FormMessage as FormMessage,
  unstable_FormRadio as FormRadio,
  unstable_FormRadioGroup as FormRadioGroup,
  unstable_FormSubmitButton as FormSubmitButton,
  unstable_useFormState as useFormState
} from "reakit/Form";
import TeamSettings, { teamSettingsTypes } from "store/teamSettings";

import Login from "store/login";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import wretch from "wretch";

export default function TeamSettingsForm() {
  const { state, dispatch } = TeamSettings.useContainer();
  const { login } = Login.useContainer();
  const { token } = login;
  const form = useFormState({
    values: {
      name: state.settings.name,
      captain_id: state.settings.captain_id,
      locale: state.settings.locale,
      active_template_id: state.settings.active_template_id
    },
    onValidate: values => {
      if (!values.name) {
        const errors = {
          name: "Team needs a name!"
        };
        throw errors;
      }
    },
    onSubmit: async values => {
      const response = await wretch(`/team/${state.settings.id}`)
        .auth(token)
        .put(values)
        .json();
      dispatch({
        type: teamSettingsTypes.UPDATE_TEAM_SETTINGS,
        payload: response
      });
    }
  });

  return (
    <aside css={{ width: 200 }}>
      <Form {...form} css={{ width: "100%" }}>
        <FormInput
          {...form}
          css={theme => ({
            width: "100%",
            boxSizing: "border-box",
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.3)",
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: theme.spacing(2)
          })}
          name="name"
          placeholder={state.settings.name}
        />
        <FormMessage
          {...form}
          css={theme => ({
            fontSize: "0.8em",
            color: theme.palette.warning,
            textDecoration: "underline",
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: theme.spacing(2)
          })}
          name="name"
        />
        <FormRadioGroup
          {...form}
          name="captain_id"
          css={theme => ({
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.3)",
            marginBottom: theme.spacing(2)
          })}
        >
          <FormLabel {...form} as="legend" name="captain_id">
            Captain
          </FormLabel>
          {state.players.items.map(player => (
            <label key={player.id}>
              <FormRadio {...form} name="captain_id" value={player.id} />{" "}
              {player.kit_number}. {player.name}
            </label>
          ))}
        </FormRadioGroup>
        <FormRadioGroup
          {...form}
          name="locale"
          css={theme => ({
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.3)",
            marginBottom: theme.spacing(4)
          })}
        >
          <FormLabel {...form} as="legend" name="locale">
            Team Locale
          </FormLabel>
          <label>
            <FormRadio {...form} name="locale" value="pl" /> 🇬🇧 EN
          </label>
          <label>
            <FormRadio {...form} name="locale" value="en" /> 🇵🇱 PL
          </label>
        </FormRadioGroup>
        <FormRadioGroup
          {...form}
          name="active_template_id"
          css={theme => ({
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.3)",
            marginBottom: theme.spacing(2)
          })}
        >
          <FormLabel {...form} as="legend" name="active_template_id">
            Template to use
          </FormLabel>
          {state.templateGroups.items.map(group => (
            <label key={group.id}>
              <FormRadio {...form} name="active_template_id" value={group.id} />{" "}
              {group.name}
            </label>
          ))}
        </FormRadioGroup>
        <FormSubmitButton
          {...form}
          css={theme => ({
            width: "100%",
            height: 36,
            borderRadius: 2,
            border: "1px solid rgba(0, 0, 0, 0.3)",
            backgroundColor: theme.palette.success,
            ...theme.typography.content
          })}
        >
          SUBMIT
        </FormSubmitButton>
      </Form>
    </aside>
  );
}
