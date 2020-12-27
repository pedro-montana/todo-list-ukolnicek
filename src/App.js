import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { AuthProvider } from './auth';
import { PrivateRoute } from './PrivateRoute';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import { ErrorPage } from './pages/ErrorPage';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/logout" component={Logout} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};
