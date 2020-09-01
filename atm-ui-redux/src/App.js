import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { hot } from "react-hot-loader";
import Dashboard from "./dashboard/Dashboard";

const App = () => (
    // <Router>
    //     <Route path="/" component={Login} />
    //     <Route path="/" component={Dashboard} />
    // </Router>
    <Dashboard/>
);

// App.propTypes = {
//     store: PropTypes.object.isRequired,
// };

export default hot(module)(App);
