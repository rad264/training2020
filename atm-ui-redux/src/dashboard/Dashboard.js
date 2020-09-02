import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Summary from "./Summary";
import AccountList from "./AccountList";
import AccountActions from "./AccountActions";
import Transactions from "./Transactions";
import NavigationBar from "./NavigationBar";
import CreateAccount from "./CreateAccount";
import { Container, Row, Col } from "react-bootstrap";

import { getUserId, getAccounts } from "./state/selectors";
import { loadAccounts } from "./state/thunks";

const Dashboard = ({ userId, accounts, startLoadingAccounts }) => {
    useEffect(() => {
        startLoadingAccounts(userId);
    }, []);
    const createAccount = (
        <Container>
            <CreateAccount />
        </Container>
    );

    const dashboard = (
        <Container>
            <Row>
                <Col md={4}>
                    <AccountList></AccountList>
                </Col>
                <Col md={8}>
                    <Summary />
                    <AccountActions />
                    <Transactions />
                </Col>
            </Row>
        </Container>
    );
    return (
        <div>
            <NavigationBar />
            {accounts.length ? dashboard : createAccount}
        </div>
    );
};

const mapStateToProps = (state) => ({
    userId: getUserId(state),
    accounts: getAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingAccounts: (userId) => dispatch(loadAccounts(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
