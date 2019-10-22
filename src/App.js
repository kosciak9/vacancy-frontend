/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import theme from "common/theme";
import NavigationBar from "components/NavigationBar";
import { ThemeProvider } from "emotion-theming";
import Login from "store/login";

import { Switch, Route } from "wouter";
import AvailabilityView from "pages/AvailabilityView";
import TeamSettingsView from "pages/TeamSettingsView";
import LoginView from "pages/LoginView";
import Availability from "store/availability";
import TeamOverview from "store/teamOverview";
import TeamSettings from "store/teamSettings";
import TeamView from "pages/TeamView";

export default function App() {
  const { login } = Login.useContainer();
  const { loggedIn } = login;

  return (
    <Availability.Provider>
      <TeamOverview.Provider>
        <TeamSettings.Provider>
          <ThemeProvider theme={theme}>
            {loggedIn ? (
              <Fragment>
                <NavigationBar />
                <Switch>
                  <Route path="/personal" component={AvailabilityView} />
                  <Route path="/personal/settings">Personal Settings</Route>
                  <Route path="/team" component={TeamView} />
                  <Route path="/team/settings" component={TeamSettingsView} />
                </Switch>
              </Fragment>
            ) : (
              <LoginView />
            )}
          </ThemeProvider>
        </TeamSettings.Provider>
      </TeamOverview.Provider>
    </Availability.Provider>
  );
}
