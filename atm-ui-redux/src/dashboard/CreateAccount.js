import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AccountTypeSelect from "./AccountTypeSelect";
import { Card, Form, Button } from "react-bootstrap";

import { postCreateAccountRequest } from "./state/thunks";

const CreateAccount = ({ statusCode, postCreateAccount }) => {
    const [data, setState] = useState({
        userId: "jwong",
        accountType: "",
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            postCreateAccount(data);
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
                    <AccountTypeSelect
                        onChange={updateField}
                        accountNumber={data.accountType}
                    />
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    postCreateAccount: (data) => dispatch(postCreateAccountRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
