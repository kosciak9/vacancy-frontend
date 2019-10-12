/** @jsx jsx */
import { jsx } from "@emotion/core";
import theme from "common/theme";
import DayContainer from "components/DayContainer";
import NavigationBar from "components/NavigationBar";
import { ThemeProvider } from "emotion-theming";
import { Switch, Route } from "wouter";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
      {/* <Switch> */}
      {/*   <Route path="/personal">Personal</Route> */}
      {/*   <Route path="/personal/settings">Personal Settings</Route> */}
      {/*   <Route path="/team">Team</Route> */}
      {/*   <Route path="/team/settings">Team Settings</Route> */}
      {/* </Switch> */}
      <DayContainer />
    </ThemeProvider>
  );
}
