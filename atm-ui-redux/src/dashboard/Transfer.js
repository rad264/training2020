import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AccountNumberSelect from "./AccountNumberSelect";
import AmountInput from "./AmountInput";
import Error from "../common/Error";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

import { getTransferError, getTransferMessage } from "./state/selectors";
import { postTransferRequest } from "./state/thunks";

const Transfer = ({ postTransfer, error, message }) => {
    const [data, setState] = useState({
        fromAccountNumber: "",
        toAccountNumber: "",
        transferAmount: "",
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            postTransfer(data);
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
                        label={"From "}
                        onChange={updateField}
                        nameAlt={"fromAccountNumber"}
                        accountNumber={data.fromAccountNumber}
                    />
                    <AccountNumberSelect
                        label={"To "}
                        onChange={updateField}
                        nameAlt={"toAccountNumber"}
                        accountNumber={data.toAccountNumber}
                    />
                    <AmountInput
                        onChange={updateField}
                        action={"transfer"}
                        amount={data.transferAmount}
                    />
                    <Form.Group as={Row}>
                        <Col md={8}>
                            <Error error={error} message={message} />
                        </Col>
                        <Col md={4}>
                            <Button variant="primary" type="submit">
                                Transfer
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    error: getTransferError(state),
    message: getTransferMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
    postTransfer: (data) => dispatch(postTransferRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
