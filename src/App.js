import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/Store";
import { adminIsAuthenticated, adminIsNotAuthenticated } from "./authenticate/Admin";
import { userIsAuthenticated, userIsNotAuthenticated } from "./authenticate/User";
import AdminLogin from './components/Admin/Login/Login';
import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import UserLogin from './components/User/Login/Login';
import UserRegister from './components/User/Register/Register';
import ActivateAccount from "./components/User/AccountActivation/AccountActivation";
import ReadSingleResponse from "./components/User/ReadSingleResponse/ReadSingleResponse";
import ReadAllResponses from './components/User/ReadAllResponses/ReadAllResponses';
import SendSupport from './components/User/SendSupport/SendSupport';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Switch>
              <Route exact path="/" component={userIsNotAuthenticated(UserLogin)} />
              <Route exact path="/admin/7f2db1e4-66ed" component={adminIsNotAuthenticated(AdminLogin)} />
              <Route exact path="/dashboard" component={adminIsAuthenticated(AdminDashboard)} />
              <Route exact path="/user-login" component={userIsNotAuthenticated(UserLogin)} />
              <Route exact path="/user-register" component={userIsNotAuthenticated(UserRegister)} />
              <Route exact path="/activate-account/:id" component={userIsNotAuthenticated(ActivateAccount)} />
              <Route exact path="/user-dashboard" component={userIsAuthenticated(ReadAllResponses)} />
              <Route exact path="/user-support" component={userIsAuthenticated(SendSupport)} />
              <Route exact path="/response/:id" component={userIsAuthenticated(ReadSingleResponse)} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
