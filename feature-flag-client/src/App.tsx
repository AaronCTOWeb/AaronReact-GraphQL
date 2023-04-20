import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { LoginScreen } from './screens/login';
import { DashboardScreen } from './screens/dashboard';
import { useFlags } from './helpers/flagsProvider';
import { AppContext } from './context';

const App = () => {
  const [flags] = useFlags();

  return (
    <AppContext.Provider value={flags}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/dashboard" component={DashboardScreen} />
          <Route component={() => <Redirect to="/login" />} />
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
