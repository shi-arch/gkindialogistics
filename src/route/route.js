import React from "react";
import MainPage from '../components/mainpage'
import UserList from '../components/userlist'
import Form from '../components/form'
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
          <Route exact path="/form">
            <Form />
          </Route>
          <Route path="/userlist">
            <UserList />
          </Route>
        </Switch>
    </Router>
  );
}