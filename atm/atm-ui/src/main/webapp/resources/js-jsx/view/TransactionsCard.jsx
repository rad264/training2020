class TransactionsCard extends React.Component {

    render() {

        let alert;
        switch (this.props.statusCode) {
            case(null):
                alert = null;
                break;
            case 200:
                alert = null;
                break;
            case 404:
                alert = <AlertFail error={"Account Not Found."}/>;
                break;
            default:
                alert = <AlertFail error={"Unexpected Error."}/>;
                break;
        }

        return (<div class="card mb-3">
            <div class="card-header smbc-color-primary border-success">Transactions</div>
            <div class="card-body">

                <TransactionsTable transactions={this.props.transactions} statusCode={this.props.responseStatus}></TransactionsTable>
                {alert}

            </div>
        </div>);
    }

}
