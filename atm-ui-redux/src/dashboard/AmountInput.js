import React from "react";
import styled from "styled-components";
import { Form, Row, Col, InputGroup } from "react-bootstrap";

const AmountInput = ({ onChange, action, amount }) => {
    return (
        <Form.Group as={Row} controlId={`${action}Amount`}>
            <Form.Label column md={5}>
                Amount
            </Form.Label>
            <Col md={7}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Amount"
                        name={`${action}Amount`}
                        value={amount}
                        onChange={onChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter valid amount.
                    </Form.Control.Feedback>
                </InputGroup>
            </Col>
        </Form.Group>
    );
};

export default AmountInput;
