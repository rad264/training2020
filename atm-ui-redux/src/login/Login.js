import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import LoginForm from "./LoginForm"
import CreateUser from "./CreateUser"
import { Container, Jumbotron } from "react-bootstrap";

const Login = () => {
    const loadingMessage = <div>Loading account(s)...</div>;

    const content = (
        <div>
            <NavigationBar />
            <Container>
                <Jumbotron>
                    <h1>Login</h1>
                    <hr></hr>

                    <LoginForm />

                    <hr></hr>
                    
                </Jumbotron>
            </Container>
        </div>
    );
    // return isLoading ? loadingMessage : content;
    return content;
};

export default Login;
