import React from "react";
import styled from "styled-components";
import Deposit from "./Deposit"
import { Tabs, Tab } from "react-bootstrap";


const AccountActions = ({ statusCode }) => {
    return (
        <Tabs defaultActiveKey="deposit" id="uncontrolled-tab-example">
            <Tab eventKey="deposit" title="Deposit">
                <Deposit/>
            </Tab>
            <Tab eventKey="withdraw" title="Withdraw">
                
            </Tab>
            <Tab eventKey="transfer" title="Transfer">
                
            </Tab>
            <Tab eventKey="create" title="Create">
                
            </Tab>
        </Tabs>
    );
};

export default AccountActions;