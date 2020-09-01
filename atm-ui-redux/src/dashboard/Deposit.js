import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Card, Form, Row, Col, Button, InputGroup } from "react-bootstrap";

import { postDepositRequest } from "./state/thunks";

const Deposit = ({ statusCode, postDeposit }) => {
    const [data, setState] = useState({
        accountNumber: "",
        depositAmount: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        postDeposit(data);
    };

    const updateField = (e) => {
        setState({
            ...data,
            [e.target.name]:
                e.target.type == "number"
                    ? Number.parseFloat(e.target.value)
                    : e.target.value,
        });
    };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={onSubmit} autoComplete="off">
                    <Form.Group as={Row} controlId="accountNumber">
                        <Form.Label column md={5}>
                            Account Number
                        </Form.Label>
                        <Col md={7}>
                            <Form.Control
                                type="text"
                                placeholder="Account Number"
                                name="accountNumber"
                                value={data.accountNumber}
                                onChange={updateField}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="depositAmount">
                        <Form.Label column md={5}>
                            Amount
                        </Form.Label>
                        <Col md={7}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="number"
                                    placeholder="Deposit Amount"
                                    name="depositAmount"
                                    value={data.depositAmount}
                                    onChange={updateField}
                                />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Deposit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    postDeposit: (data) => dispatch(postDepositRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
