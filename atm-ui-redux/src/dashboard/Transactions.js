import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import TransactionsTable from "./TransactionsTable";

import { getTransactions } from "./state/selectors";
import { loadTransactions } from "./state/thunks";

const Transactions = ({ statusCode, transactions, startLoadingTransactions }) => {
    useEffect(() => {
        startLoadingTransactions();
    }, []);
    return (
        <Card>
            <Card.Header>Transactions</Card.Header>
            <Card.Body>
                <TransactionsTable transactions={transactions}/>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    transactions: getTransactions(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingTransactions: () => dispatch(loadTransactions("123456"))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
