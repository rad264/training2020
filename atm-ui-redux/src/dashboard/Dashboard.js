import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SummaryCard from "./SummaryCard";
import AccountList from "./AccountList";
import AccountActions from "./AccountActions";
import Transactions from "./Transactions";
import { Container, Row, Col } from "react-bootstrap";

import {
    getAccountLoading,
    getAccount,
    getAccounts,
    getTransactions,
} from "./state/selectors";
import { loadAccount, loadAccounts, loadTransactions } from "./state/thunks";

const Dashboard = ({
    isLoading,
    account,
    accounts,
    transactions,
    startLoadingAccount,
    startLoadingAccounts,
    startLoadingTransactions,
}) => {
    useEffect(() => {
        startLoadingAccount();
        startLoadingAccounts();
        startLoadingTransactions();
    }, []);

    const loadingMessage = <div>Loading account(s)...</div>;

    const content = (
        <Container>
            <Row>
                <Col md={4}>
                    <AccountList accounts={accounts}></AccountList>
                </Col>
                <Col md={8}>
                    <SummaryCard account={account} />
                    <AccountActions />
                    <Transactions transactions={transactions} />
                </Col>
            </Row>
        </Container>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
    isLoading: getAccountLoading(state),
    account: getAccount(state),
    accounts: getAccounts(state),
    transactions: getTransactions(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingAccount: () => dispatch(loadAccount("123456")),
    startLoadingAccounts: () => dispatch(loadAccounts("jwong")),
    startLoadingTransactions: () => dispatch(loadTransactions("123456")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
