/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Provider, Subscribe } from "unstated";

import LoginContainer from "store/LoginContainer";
import AvailabilityContainer from "components/availability/personal/PersonalAvailability";

const AvailabilityView = () => {
  return (
    <Provider>
      <Subscribe to={[LoginContainer]}>
        {login => (
          <main css={{ paddingTop: 100 }}>
            <AvailabilityContainer login={login} />
          </main>
        )}
      </Subscribe>
    </Provider>
  );
};

export default AvailabilityView;
