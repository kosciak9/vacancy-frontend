import wretch from "wretch";
import { useReducer, useEffect } from "react";
import { createContainer } from "unstated-next";
import { find } from "lodash";
import produce from "immer";
import { getNextMonday } from "store/common";

import Login from "store/login";

const availabilityTypes = {
  SUBMIT_FETCHED: "submit",
  UPDATE_AVAILABILITY: "update",
  REFETECH: "refetch",
  UPDATE_QUERY: "update_query"
};

function availabilityReducer(state, action) {
  switch (action.type) {
    case availabilityTypes.SUBMIT_FETCHED:
      return { query: state.query, items: action.payload, unfetched: false };
    case availabilityTypes.UPDATE_AVAILABILITY:
      return produce(state, draft => {
        const day = find(draft.items, { date: action.payload.date });
        const av = find(day.availabilities, { id: action.payload.id });

        av.available = action.payload.available;
        av.uncertain = action.payload.uncertain;
      });
    case availabilityTypes.REFETECH:
      return { ...state, unfetched: true };
    case availabilityTypes.UPDATE_QUERY:
      console.log(action);
      return produce(state, draft => {
        if (action.payload.date) {
          draft.query.start_date = action.payload.date.toISOString();
        }
        draft.query.days = action.payload.days || draft.query.days;
        draft.unfetched = true;
      });
    default:
      throw new Error("Reducer type unknown");
  }
}

const useAvailability = () => {
  const [state, dispatch] = useReducer(availabilityReducer, {
    query: { start_date: getNextMonday(), days: 6 },
    items: [],
    unfetched: true
  });

  const { login } = Login.useContainer();
  useEffect(() => {
    if (state.unfetched && login.loggedIn) {
      const { token } = login;
      wretch()
        .url("/api/me/mapped")
        .auth(token)
        .query(state.query)
        .get()
        .json()
        .then(response =>
          dispatch({
            type: availabilityTypes.SUBMIT_FETCHED,
            payload: response
          })
        );
    }
  }, [login, dispatch, state]);

  return { state, dispatch };
};

const Availability = createContainer(useAvailability);

export { availabilityTypes };
export default Availability;
