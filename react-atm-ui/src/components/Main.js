import React, { Component } from "react";
import Summary from "./Summary";
import { Tabs, Tab } from 'react-bootstrap';

class Main extends Component {
  render() {
    return (
        <Tabs defaultActiveKey="summary" id="tab-box">
          <Tab eventKey="summary" title="Summary">
            <Summary/>
          </Tab>
          <Tab eventKey="deposit" title="Deposit">

          </Tab>
          <Tab eventKey="withdraw" title="Withdraw">

          </Tab>
          <Tab eventKey="transfer" title="Transfer" disabled>

          </Tab>
        </Tabs>
    );
  }
}
export default Main;
