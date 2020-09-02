import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AccountNumberSelect from "./AccountNumberSelect";
import AmountInput from "./AmountInput";
import Error from "../common/Error";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

import { getWithdrawError, getWithdrawMessage } from "./state/selectors";
import { postWithdrawRequest } from "./state/thunks";

const Withdraw = ({ postWithdraw, error, message }) => {
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
                    <AmountInput
                        onChange={updateField}
                        action={"withdraw"}
                        amount={data.withdrawAmount}
                    />
                    <Form.Group as={Row}>
                        <Col md={8}>
                            <Error error={error} message={message} />
                        </Col>
                        <Col md={4}>
                            <Button variant="primary" type="submit">
                                Withdraw
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    error: getWithdrawError(state),
    message: getWithdrawMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
    postWithdraw: (data) => dispatch(postWithdrawRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
