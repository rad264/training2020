import React from "react";
import styled from "styled-components";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    src="images/logo_group.png"
                    className="d-inline-block align-top"
                    alt="SMBC LOGO"
                />
            </Navbar.Brand>
        </Navbar>
    );
};

export default NavigationBar;
