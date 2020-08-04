import React, {Component} from "react";
import "./App.css";
import {Container} from "react-bootstrap";
import NavBar from "./components/NavigationBar";
import Main from "./components/Main";

class App extends Component {
    state = {
        isLoading: true,
        groups: []
    };

    async componentDidMount() {
        const response = await fetch("/atm-api/users/jwong");
        const body = await response.json();
        this.setState({groups: body, isLoading: false});
    }

    render() {
        const {groups, isLoading} = this.state;

        // if (isLoading) {
        //     return <p>Loading...</p>;
        // }

        return (<div className="App">
            <NavBar/>
            <Container>
                <Main/>
                <div>
                    {groups.userId}
                </div>
                <div>
                    {groups.accounts}
                </div>
            </Container>
        </div>);
    }
}

export default App;
