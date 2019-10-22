import { useEffect, useReducer } from "react";

import Login from "store/login";
import { createContainer } from "unstated-next";
import produce from "immer";
import wretch from "wretch";

const teamSettingsTypes = {
  UPDATE_TEAM_SETTINGS: "update_team_settings",
  UPDATE_TEMPLATE_GROUPS: "update_template_groups",
  UPDATE_TEMPLATES: "update_templates",
  UPDATE_PLAYERS: "update_players",
  SET_CURRENTLY_VIEWED: "set_currently_viewed",
  REFRESH_TEMPLATES: "refresh_templates"
};

function teamSettingsReducer(state, action) {
  switch (action.type) {
    case teamSettingsTypes.UPDATE_TEAM_SETTINGS:
      return produce(state, draft => {
        const {
          id,
          name,
          locale,
          active_template_id,
          captain_id
        } = action.payload;
        draft.settings = { id, name, locale, active_template_id, captain_id };
        draft.unfetched = false;
      });
    case teamSettingsTypes.UPDATE_PLAYERS:
      return produce(state, draft => {
        draft.players.items = action.payload;
        draft.players.unfetched = false;
      });
    case teamSettingsTypes.UPDATE_TEMPLATE_GROUPS:
      return produce(state, draft => {
        draft.templateGroups.items = action.payload;
        draft.templateGroups.unfetched = false;
      });
    case teamSettingsTypes.REFRESH_TEMPLATES:
      return produce(state, draft => {
        draft.editedTemplateGroup.unfetched = true;
      });
    case teamSettingsTypes.UPDATE_TEMPLATES:
      return produce(state, draft => {
        const sortedTemplates = action.payload.sort((a, b) => {
          return a.weekday === b.weekday
            ? a.from > b.from
            : a.weekday > b.weekday;
        });
        draft.editedTemplateGroup.items = sortedTemplates;
        draft.editedTemplateGroup.unfetched = false;
      });
    case teamSettingsTypes.SET_CURRENTLY_VIEWED:
      return produce(state, draft => {
        draft.editedTemplateGroup.currentlyViewed = action.payload;
      });
    default:
      throw new Error(`Reducer type unknown: ${action.type}`);
  }
}

const useTeamSettings = () => {
  const [state, dispatch] = useReducer(teamSettingsReducer, {
    unfetched: true,
    settings: { name: "" },
    templateGroups: { items: [], unfetched: true },
    editedTemplateGroup: { currentlyViewed: null, items: [], unfetched: true },
    players: { items: [], unfetched: true }
  });

  const { login } = Login.useContainer();
  useEffect(() => {
    if (state.unfetched && login.loggedIn) {
      const { token } = login;
      wretch()
        .url("/me/team")
        .auth(token)
        .get()
        .json()
        .then(response =>
          dispatch({
            type: teamSettingsTypes.UPDATE_TEAM_SETTINGS,
            payload: response
          })
        );
    }
  }, [login, dispatch, state]);

  useEffect(() => {
    if (state.players.unfetched && login.loggedIn) {
      const { token } = login;
      wretch()
        .url("/me/team/player")
        .auth(token)
        .get()
        .json()
        .then(response =>
          dispatch({
            type: teamSettingsTypes.UPDATE_PLAYERS,
            payload: response
          })
        );
    }
  }, [login, dispatch, state.players]);

  useEffect(() => {
    if (state.templateGroups.unfetched && login.loggedIn) {
      const { token } = login;
      wretch()
        .url("/me/team/template_group")
        .auth(token)
        .get()
        .json()
        .then(response =>
          dispatch({
            type: teamSettingsTypes.UPDATE_TEMPLATE_GROUPS,
            payload: response
          })
        );
    }
  }, [login, dispatch, state.templateGroups]);

  useEffect(() => {
    if (
      state.editedTemplateGroup.currentlyViewed &&
      state.editedTemplateGroup.unfetched &&
      login.loggedIn
    ) {
      const { token } = login;
      wretch()
        .url(
          `/team/${state.settings.id}/template_group/${state.editedTemplateGroup.currentlyViewed}/template`
        )
        .auth(token)
        .get()
        .json()
        .then(response =>
          dispatch({
            type: teamSettingsTypes.UPDATE_TEMPLATES,
            payload: response
          })
        );
    }
  }, [
    login,
    dispatch,
    state.editedTemplateGroup.currentlyViewed,
    state.editedTemplateGroup.unfetched,
    state.settings.id
  ]);

  return { state, dispatch };
};

const TeamSettings = createContainer(useTeamSettings);

export { teamSettingsTypes };
export default TeamSettings;