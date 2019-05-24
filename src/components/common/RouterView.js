/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Subscribe, Provider } from "unstated";
import LoginContainer from "store/LoginContainer";

import NavigationBar from "components/common/NavigationBar";

import AvailabilityView from "components/availability/personal/PersonalView";
import CaptainView from "components/availability/team/CaptainView";
import PersonalSettingsView from "components/settings/PersonalSettingsView";

const RouterView = () => {
  return (
    <Router>
      <Provider>
        <Subscribe to={[LoginContainer]}>
          {login => <NavigationBar login={login} />}
        </Subscribe>
      </Provider>
      <Route path="/availability" component={AvailabilityView} />
      <Route path="/captain" component={CaptainView} />
      <Route path="/settings" component={PersonalSettingsView} />
    </Router>
  );
};

export default RouterView;
