import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import AccountForm from './Form.js';


class Summary extends Component {
    render() {
        return (
            <div>
            <Jumbotron>
            <h1 className="display-2">Welcome to online banking!</h1>
            <p className="lead">Do all your online banking stuff here.</p>
            <hr className="my-2" />
            <p>We provide all the online banking stuff you want.</p>
            <AccountForm/>
            </Jumbotron>
            </div>
        )
    }
};

export default Summary;
