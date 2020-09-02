import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Card, Form, Button, InputGroup } from "react-bootstrap";

import { postCreateUserRequest } from "./state/thunks";

const CreateUser = ({ statusCode, postCreateUser }) => {
    const [newUserId, setNewUserId] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            postCreateUser(newUserId);
        }
        setValidated(true);
    };

    const updateField = (e) => {
        setNewUserId(e.target.value);
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
                    <Form.Group controlId="newUserId">
                        <Form.Label>Username</Form.Label>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>U</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Username"
                                name="newUsername"
                                value={newUserId}
                                onChange={updateField}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    postCreateUser: (data) => dispatch(postCreateUserRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
