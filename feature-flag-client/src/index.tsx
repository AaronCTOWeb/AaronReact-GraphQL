import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import ReactDOM from 'react-dom';

import { LoginScreen } from './screens/login';
import { DashboardScreen } from './screens/dashboard';

import './index.css';
import FeatureFlagProvider from './contexts/FeatureFlagContext';

ReactDOM.render(
  <React.StrictMode>
    <FeatureFlagProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/dashboard" component={DashboardScreen} />
          <Route component={() => <Redirect to="/login" />} />
        </Switch>
      </Router>
    </FeatureFlagProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
