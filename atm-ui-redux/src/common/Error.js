import React from "react";
import styled from "styled-components";
import { Alert } from "react-bootstrap";

const Error = ({ error, message }) => {
    const alert = error ? (
        <Alert variant="danger">{message}</Alert>
    ) : message ? (
        <Alert variant="success">{message}</Alert>
    ) : null;
    return alert;
};

export default Error;