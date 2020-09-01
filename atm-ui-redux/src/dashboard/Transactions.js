import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import TransactionsTable from "./TransactionsTable";

const Transactions = ({ statusCode, transactions }) => {
    return (
        <Card>
            <Card.Header>Transactions</Card.Header>
            <Card.Body>
                <TransactionsTable transactions={transactions}/>
            </Card.Body>
        </Card>
    );
};

export default Transactions;
