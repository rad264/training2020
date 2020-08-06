class App extends React.Component {
    render() {
        return (<div>
            <NavigationBar/>
            <div class="container pt-5">
                <div class="row">
                    <GetAccountsController/>
                    <div class="col-8">
                        <AccountSummary/>
                        <AccountActions/>
                        <Transactions/>
                    </div>
                </div>
            </div>
        </div>);
    }
}
ReactDOM.render(<App/>, document.getElementById("root"));
