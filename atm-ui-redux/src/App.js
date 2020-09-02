import React from "react";
import { hot } from "react-hot-loader";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import { Router, Route } from "react-router";

const App = ({ history }) => (
    <Router history={history}>
        <Route path="/" component={Login}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
    </Router>
);
export default hot(module)(App);
