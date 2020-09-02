import React from "react";
import styled from "styled-components";
import { Form, Row, Col } from "react-bootstrap";

const AccountTypeSelect = ({ onChange, accountType }) => {
    const accountTypes = [
        "Checking",
        "Saving",
        "Money Market",
        "Certificate of Deposit",
        "Individual Retirement",
    ];

    return (
        <Form.Group as={Row}>
            <Form.Label column md={5}>
                Account Type
            </Form.Label>
            <Col md={7}>
                <Form.Control
                    as="select"
                    name="accountType"
                    onChange={onChange}
                    value={accountType}
                    required
                >
                    <option value="" disabled>
                        Select Account Type
                    </option>
                    {accountTypes.map((type, i) => (
                        <option key={i} value={type}>
                            {type}
                        </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Please select valid account type.
                </Form.Control.Feedback>
            </Col>
        </Form.Group>
    );
};

export default AccountTypeSelect;
