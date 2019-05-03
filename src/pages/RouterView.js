/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";

import AvailabilityView from "./AvailabilityView";
import CaptainView from "./CaptainView";
// import PersonalSettingsView from "./PersonalSettingsView";
// import TeamSettingsView from "./TeamSettingsView";

const RouterView = props => {
  return (
    <main
      css={{
        marginTop: 100,
        height: "calc(100% - 100px)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Router>
        <NavigationBar login={props.login} />
        <Route path="/availability" component={AvailabilityView} />
        <Route path="/captain" component={CaptainView} />
      </Router>
    </main>
  );
};

export default RouterView;
