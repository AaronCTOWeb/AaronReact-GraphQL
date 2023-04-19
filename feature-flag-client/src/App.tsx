import React, { createContext, useState } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { LoginScreen } from "./screens/login";
import { DashboardScreen } from "./screens/dashboard";

import * as LDClient from "launchdarkly-js-client-sdk";
import {
  detailsCtaFlagKey,
  launchBannerFlagKey,
  profileSectionFlagKey,
} from "./feature-flag-config";

// Create context for use flag value in children component
const FlagContext = createContext<{
  generalRender: boolean;
  profileRender: String;
  detailsSection: String;
}>({
  generalRender: false,
  profileRender: "",
  detailsSection: "",
});

const App = () => {
  const context: LDClient.LDContext = {
    kind: "user",
    key: "context-key-123abc",
  };

  // initialize Client for got flag values
  const client = LDClient.initialize(
    (process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID as string) || "",
    context
  );

  const [flags, setFlags] = useState<{
    generalRender: boolean;
    profileRender: String;
    detailsSection: String;
  }>({
    generalRender: false,
    profileRender: "",
    detailsSection: "",
  });

  // Check the initialize Client
  client.on("ready", () => {
    // get flag values are now available
    const generalRenderflag = client.variation(launchBannerFlagKey) as boolean;
    const detailsSectionflag = client.variation(detailsCtaFlagKey) as String;
    const profileRenderflag = client.variation(profileSectionFlagKey) as String;

    // Set flag value
    setFlags({
      generalRender: generalRenderflag,
      profileRender: profileRenderflag,
      detailsSection: detailsSectionflag,
    });
  });

  return (
    // Setup context for use flag value in children component
    <FlagContext.Provider value={flags}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/dashboard" component={DashboardScreen} />
          <Route component={() => <Redirect to="/login" />} />
        </Switch>
      </Router>
    </FlagContext.Provider>
  );
};

export { FlagContext };
export default App;
