class App extends React.Component {
    render() {
        return (<div>
            <NavigationBar/>
            <div class="container">
                <div class="row">
                    <AccountGroup/>
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
