import React from "react";
import { connect } from "react-redux";
import { goBack, push } from "react-router-redux";
import styled from "styled-components";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { getUserId } from "./state/selectors";

const NavigationBar = ({ userId }) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    src="images/logo_group.png"
                    className="d-inline-block align-top"
                    alt="SMBC LOGO"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link
                        active
                        href="/dashboard"
                        onClick={push("/dashboard")}
                    >
                        Home
                    </Nav.Link>
                    <NavDropdown alignRight title={userId} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/" onClick={push("/")}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const mapStateToProps = (state) => ({
    userId: getUserId(state),
});

export default connect(mapStateToProps)(NavigationBar);
