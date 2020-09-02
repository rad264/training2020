import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AccountNumberSelect from "./AccountNumberSelect";
import AmountInput from "./AmountInput";
import { Card, Form, Button } from "react-bootstrap";

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