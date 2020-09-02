import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AccountNumberSelect from "./AccountNumberSelect";
import { Card, Form, Row, Col, Button, InputGroup } from "react-bootstrap";

import { postDepositRequest } from "./state/thunks";

const Deposit = ({ statusCode, postDeposit }) => {
    const [data, setState] = useState({
        accountNumber: "",
        depositAmount: "",
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            setState({
                ...data,
                depositAmount: Number.parseFloat(data.depositAmount),
            });
            postDeposit(data);
        }
        setValidated(true);
    };

    const updateField = (e) => {
        setState({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Card>
            <Card.Body>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <AccountNumberSelect
                        onChange={updateField}
                        accountNumber={data.accountNumber}
                    />
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
                                    required
                                    type="number"
                                    placeholder="Deposit Amount"
                                    name="depositAmount"
                                    value={data.depositAmount}
                                    onChange={updateField}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter valid amount.
                                </Form.Control.Feedback>
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
