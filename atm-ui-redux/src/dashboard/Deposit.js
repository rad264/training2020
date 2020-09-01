import React from "react";
import styled from "styled-components";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

const Deposit = ({ statusCode }) => {
    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group as={Row} controlId="accountNumber">
                        <Form.Label column md={5}>
                            Account Number
                        </Form.Label>
                        <Col md={7}>
                            <Form.Control
                                type="text"
                                placeholder="Account Number"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="depositAmount">
                        <Form.Label column md={5}>
                            Amount
                        </Form.Label>
                        <Col md={7}>
                            <Form.Control
                                type="number"
                                placeholder="Deposit Amount"
                            />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Deposit;
