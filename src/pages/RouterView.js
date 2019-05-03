/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Subscribe, Provider } from "unstated";
import LoginContainer from "../store/LoginContainer";

import NavigationBar from "../components/NavigationBar";

import AvailabilityView from "./AvailabilityView";
import CaptainView from "./CaptainView";
// import PersonalSettingsView from "./PersonalSettingsView";
// import TeamSettingsView from "./TeamSettingsView";

const breakpoints = [400, 576, 1000, 1400];

const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
const gridTemplateColumnsCount = breakpoints.map(bp => {
  let repeatedString = "";
  let times = bp / 200;
  while (times > 0) {
    repeatedString += "1fr ";
    times--;
  }

  return repeatedString;
});

const RouterView = () => {
  return (
    <main
      css={{
        paddingTop: 100,
        width: "100%",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        [mq[0]]: {
          gridTemplateColumns: gridTemplateColumnsCount[0]
        },
        [mq[1]]: {
          gridTemplateColumns: gridTemplateColumnsCount[1]
        },
        [mq[2]]: {
          gridTemplateColumns: gridTemplateColumnsCount[2]
        },
        [mq[3]]: {
          gridTemplateColumns: gridTemplateColumnsCount[3]
        }
      }}
    >
      <Router>
        <Provider>
          <Subscribe to={[LoginContainer]}>
            {login => <NavigationBar login={login} />}
          </Subscribe>
        </Provider>
        <Route path="/availability" component={AvailabilityView} />
        <Route path="/captain" component={CaptainView} />
      </Router>
    </main>
  );
};

export default RouterView;
