import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Form, Row, Col } from "react-bootstrap";

import { getAccounts } from "./state/selectors";

const AccountNumberSelect = ({
    label,
    onChange,
    nameAlt,
    accounts,
    accountNumber,
}) => {
    return (
        <Form.Group as={Row}>
            <Form.Label column md={5}>
                {label} Account Number
            </Form.Label>
            <Col md={7}>
                <Form.Control
                    as="select"
                    name={nameAlt ? nameAlt : "accountNumber"}
                    onChange={onChange}
                    value={accountNumber}
                    required
                >
                    <option value="" disabled>Select Account</option>
                    {accounts.map((account, i) => (
                        <option key={i} value={account.accountNumber}>
                            {account.accountNumber}
                        </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Please select valid account.
                </Form.Control.Feedback>
            </Col>
        </Form.Group>
    );
};

const mapStateToProps = (state) => ({
    accounts: getAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountNumberSelect);
