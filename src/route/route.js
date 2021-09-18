import React from "react";
import MainPage from '../components/mainpage'
import UserList from '../components/userlist'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default function BasicExample() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/userlist">
            <UserList />
          </Route>
        </Switch>
    </Router>
  );
}