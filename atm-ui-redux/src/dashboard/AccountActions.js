import React from "react";
import styled from "styled-components";
import Deposit from "./Deposit"
import Withdraw from "./Withdraw"
import Transfer from "./Transfer"
import CreateAccount from "./CreateAccount"
import { Tabs, Tab } from "react-bootstrap";


const AccountActions = ({ statusCode }) => {
    return (
        <Tabs defaultActiveKey="deposit" id="uncontrolled-tab-example">
            <Tab eventKey="deposit" title="Deposit">
                <Deposit/>
            </Tab>
            <Tab eventKey="withdraw" title="Withdraw">
                <Withdraw/>
            </Tab>
            <Tab eventKey="transfer" title="Transfer">
                <Transfer/>
            </Tab>
            <Tab eventKey="create" title="Create">
                <CreateAccount/>
            </Tab>
        </Tabs>
    );
};

export default AccountActions;
