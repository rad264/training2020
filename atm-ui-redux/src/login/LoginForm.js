import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Card, Form, Button, InputGroup } from "react-bootstrap";

import { getUser } from "./state/selectors";
import { loadUser } from "./state/thunks";

const LoginForm = ({ onLogin }) => {
    const [userId, setUserId] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            onLogin(userId);
        }
        setValidated(true);
    };

    const updateField = (e) => {
        setUserId(e.target.value);
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
                    <Form.Group controlId="userId">
                        <Form.Label>Username</Form.Label>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>U</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={userId}
                                onChange={updateField}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter valid username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    onLogin: (userId) => dispatch(loadUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
