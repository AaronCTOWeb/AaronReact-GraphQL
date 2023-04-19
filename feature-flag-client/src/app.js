import React from 'react'
import { withLDProvider } from 'launchdarkly-react-client-sdk';

import {
    Route,
    Switch,
    Redirect,
    BrowserRouter as Router,
} from "react-router-dom";

import { LoginScreen } from "./screens/login";
import { DashboardScreen } from "./screens/dashboard";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/dashboard" component={DashboardScreen} />
                <Route component={() => <Redirect to="/login" />} />
            </Switch>
        </Router>
    )
}

// We have used withLDProvider instead of contextAPI beacuse it withLDProvider internally already uses context API.
export default withLDProvider({
    clientSideID: process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID,
    reactOptions: {
        sendEventsOnFlagRead: true
    },
})(App);