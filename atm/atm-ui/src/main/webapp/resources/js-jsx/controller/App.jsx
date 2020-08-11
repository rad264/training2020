const ReactRouter = window.ReactRouter
const Router = ReactRouter.Router
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const Redirect = ReactRouter.Redirect
const browserHistory = ReactRouter.browserHistory
const hashHistory = ReactRouter.hashHistory

class App extends React.Component {

    render() {
        return (<Router history={hashHistory}>
            <Route path="/" component={Login}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
        </Router>);
    }
}
ReactDOM.render(<App/>, document.getElementById("root"));
