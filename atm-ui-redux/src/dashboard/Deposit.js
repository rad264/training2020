import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AccountNumberSelect from "./AccountNumberSelect";
import AmountInput from "./AmountInput";
import { Card, Form, Button } from "react-bootstrap";

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
                    <AmountInput
                        onChange={updateField}
                        action={"deposit"}
                        amount={data.depositAmount}
                    />
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
