import React, { Component } from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

class NavBar extends Component {
    render() {
        return (
            <header className="App-header">
            <Navbar variant="dark">
            <Navbar.Brand href="#home">SMBC</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#account">Account</Nav.Link>
            <Nav.Link href="#history">History</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="mr-sm-5">
            Signed in as:
            <a href="#login"> James Wong</a>
            </Navbar.Text>

            <Form inline="inline">
            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
            <Button variant="outline-light">Search</Button>
            </Form>
            </Navbar.Collapse>
            </Navbar>
            </header>
        );
    }
}

export default NavBar;
