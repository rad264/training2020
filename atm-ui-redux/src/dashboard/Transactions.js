import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import TransactionsTable from "./TransactionsTable";

import { getTransactions, getActiveAccount } from "./state/selectors";
import { loadTransactions } from "./state/thunks";

const Transactions = ({ statusCode, account, transactions, startLoadingTransactions }) => {
    useEffect(() => {
        startLoadingTransactions(account.accountNumber);
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
    account: getActiveAccount(state),
    transactions: getTransactions(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingTransactions: (accountNumber) => dispatch(loadTransactions(accountNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
