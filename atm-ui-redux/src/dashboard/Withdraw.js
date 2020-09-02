import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AccountNumberSelect from "./AccountNumberSelect";
import { Card, Form, Row, Col, Button, InputGroup } from "react-bootstrap";

import { postWithdrawRequest } from "./state/thunks";

const Withdraw = ({ statusCode, postWithdraw }) => {
    const [data, setState] = useState({
        accountNumber: "",
        withdrawAmount: "",
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
                withdrawAmount: Number.parseFloat(data.withdrawAmount),
            });
            postWithdraw(data);
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
                    <Form.Group as={Row} controlId="withdrawAmount">
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
                                    placeholder="Withdraw Amount"
                                    name="withdrawAmount"
                                    value={data.withdrawAmount}
                                    onChange={updateField}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter valid amount.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Withdraw
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    postWithdraw: (data) => dispatch(postWithdrawRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);