import wretch from "wretch";
import { useReducer, useEffect } from "react";
import { createContainer } from "unstated-next";
import produce from "immer";
import { transform } from "lodash";

import Login from "store/login";

const teamOverviewTypes = {
  UPDATE_OVERVIEW: "update_query",
  UPDATE_PLAYERS: "update_players"
};

function teamOverviewReducer(state, action) {
  switch (action.type) {
    case teamOverviewTypes.UPDATE_OVERVIEW:
      return produce(state, draft => {
        draft.items = action.payload;
        draft.unfetched = false;
      });
    case teamOverviewTypes.UPDATE_PLAYERS:
      return produce(state, draft => {
        const playersObject = transform(
          action.payload,
          (result, player) => {
            result[player.id] = player;
            return result;
          },
          {}
        );
        draft.players.items = playersObject;
        draft.players.unfetched = false;
      });
    default:
      throw new Error(`Reducer type unknown ${action.type}`);
  }
}

const getNextMonday = () => {
  const d = new Date();
  return new Date(
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7))
  ).toISOString();
};

const useTeamOverview = () => {
  const [state, dispatch] = useReducer(teamOverviewReducer, {
    query: { start_date: getNextMonday(), days: 6 },
    items: [],
    players: { unfetched: true, items: {} },
    unfetched: true
  });

  const { login } = Login.useContainer();
  useEffect(() => {
    if (state.unfetched && login.loggedIn) {
      const { token } = login;
      wretch()
        .url("/me/team/overview")
        .auth(token)
        .query(state.query)
        .get()
        .json()
        .then(response =>
          dispatch({
            type: teamOverviewTypes.UPDATE_OVERVIEW,
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
            type: teamOverviewTypes.UPDATE_PLAYERS,
            payload: response
          })
        );
    }
  }, [login, dispatch, state.players]);

  return { state, dispatch };
};

const TeamOverview = createContainer(useTeamOverview);

export { teamOverviewTypes };
export default TeamOverview;
