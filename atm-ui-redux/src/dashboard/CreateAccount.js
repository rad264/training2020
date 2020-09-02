import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AccountTypeSelect from "./AccountTypeSelect";
import Error from "../common/Error";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

import {
    getUserId,
    getCreateAccountError,
    getCreateAccountMessage,
} from "./state/selectors";
import { postCreateAccountRequest } from "./state/thunks";

const CreateAccount = ({ userId, postCreateAccount, error, message }) => {
    const [data, setState] = useState({
        userId: userId,
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
                        accountType={data.accountType}
                    />
                    <Form.Group as={Row}>
                        <Col md={8}>
                            <Error error={error} message={message} />
                        </Col>
                        <Col md={4}>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    userId: getUserId(state),
    error: getCreateAccountError(state),
    message: getCreateAccountMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
    postCreateAccount: (data) => dispatch(postCreateAccountRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
