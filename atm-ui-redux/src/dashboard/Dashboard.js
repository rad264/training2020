import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SummaryCard from "./SummaryCard";
import AccountList from "./AccountList";
import AccountActions from "./AccountActions";
import Transactions from "./Transactions";
import { Container, Row, Col } from "react-bootstrap";

import {
    getAccountsLoading,
    getAccounts,
    getTransactions,
} from "./state/selectors";
import { loadAccounts, loadTransactions } from "./state/thunks";

const Dashboard = ({
    isLoading,
    accounts,
    transactions,
    startLoadingAccounts,
    startLoadingTransactions,
}) => {
    useEffect(() => {
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
                    <SummaryCard />
                    <AccountActions />
                    <Transactions transactions={transactions} />
                </Col>
            </Row>
        </Container>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
    isLoading: getAccountsLoading(state),
    accounts: getAccounts(state),
    transactions: getTransactions(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingAccounts: () => dispatch(loadAccounts("jwong")),
    startLoadingTransactions: () => dispatch(loadTransactions("123456"))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
