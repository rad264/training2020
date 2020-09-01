import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Summary from "./Summary";
import AccountList from "./AccountList";
import AccountActions from "./AccountActions";
import Transactions from "./Transactions";
import NavigationBar from "./NavigationBar";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
    const loadingMessage = <div>Loading account(s)...</div>;

    const content = (
        <div>
            <NavigationBar />
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
        </div>
    );
    // return isLoading ? loadingMessage : content;
    return content;
};

export default Dashboard;
