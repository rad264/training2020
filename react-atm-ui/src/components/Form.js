import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class AccountForm extends Component {
  render() {
    return (
      <Form>
        <Form.Group controlId="formUser">
          <Form.Label>User</Form.Label>
          <Form.Control type="user" placeholder="Enter user" />
        </Form.Group>

        <Form.Group controlId="formAccount">
          <Form.Label>Account Number</Form.Label>
          <Form.Control type="account" placeholder="Enter account number" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AccountForm;
