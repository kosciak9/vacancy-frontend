/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Provider, Subscribe } from "unstated";

import LoginContainer from "../store/LoginContainer";
import AvailabilityContainer from "../components/AvailabilityContainer";

const AvailabilityView = () => {
  return (
    <Provider>
      <Subscribe to={[LoginContainer]}>
        {login => <AvailabilityContainer login={login} />}
      </Subscribe>
    </Provider>
  );
};

export default AvailabilityView;
