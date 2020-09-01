import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

const AccountCard = ({ statusCode, account }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{account.accountType}</Card.Title>
                <h3>{account.accountNumber}</h3>
                <h4>${Number.parseFloat(account.balance).toFixed(2)}</h4>
                <Card.Subtitle>Available Balance</Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export default AccountCard;
