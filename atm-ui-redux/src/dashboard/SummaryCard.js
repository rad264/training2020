import React from "react";
import styled from "styled-components";
import Card from 'react-bootstrap/Card';

const SummaryCard = ({statusCode, account}) => {
    
    return (
        <Card>
            <Card.Body>
                <Card.Title>{account.accountType}</Card.Title>
                <h2>{account.accountNumber}</h2>
                    <h1>
                        ${Number.parseFloat(account.balance).toFixed(2)}
                    </h1>
                <Card.Subtitle>Available Balance</Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export default SummaryCard;
