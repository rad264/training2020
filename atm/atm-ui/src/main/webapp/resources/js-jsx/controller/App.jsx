const ReactRouter = window.ReactRouter;
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Link = ReactRouter.Link;
const Redirect = ReactRouter.Redirect;
const browserHistory = ReactRouter.browserHistory;
const hashHistory = ReactRouter.hashHistory;

const Switch = ReactRouter.Switch;

class App extends React.Component {
    state = {
        userId: "",
    };

    onUserIdChange = (userId) => {
        this.setState({ userId: userId });
    };

    render() {
        return (
            <Router history={hashHistory}>
                <Route exact="exact" path="/" component={Login}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
            </Router>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
