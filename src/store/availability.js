import wretch from "wretch";
import { useReducer, useEffect } from "react";
import { createContainer } from "unstated-next";
import { find } from "lodash";
import produce from "immer";

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
      return { ...state, query: action.payloa };
    default:
      throw new Error("Reducer type unknown");
  }
}

const getNextMonday = () => {
  const d = new Date();
  return new Date(
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7))
  ).toISOString();
};

const useAvailability = () => {
  const [state, dispatch] = useReducer(availabilityReducer, {
    query: { start_date: getNextMonday(), days: 6 },
    items: [],
    unfetched: false
  });

  const { login } = Login.useContainer();
  useEffect(() => {
    if (state.unfetched && login.loggedIn) {
      const { token } = login;
      wretch()
        .url("/me/mapped")
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
