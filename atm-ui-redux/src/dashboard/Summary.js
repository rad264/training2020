import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

import { getActiveAccount } from "./state/selectors";

const Summary = ({ statusCode, account }) => {

    const noActiveAccount = (
        <Card.Body>
            <Card.Title>Select an Account</Card.Title>
        </Card.Body>
    );

    const summary = (
        <Card.Body>
            <Card.Title>{account.accountType}</Card.Title>
            <h2>{account.accountNumber}</h2>
            <h1>${Number.parseFloat(account.balance).toFixed(2)}</h1>
            <Card.Subtitle>Available Balance</Card.Subtitle>
        </Card.Body>
    );
    return (
        <Card>
            {account ? summary : noActiveAccount}
        </Card>
    );
};

const mapStateToProps = (state) => ({
    account: getActiveAccount(state),
});

export default connect(mapStateToProps)(Summary);
