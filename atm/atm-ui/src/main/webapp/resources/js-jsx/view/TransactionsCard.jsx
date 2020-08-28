class TransactionsCard extends React.Component {

    render() {

        const {statusCode, transactions, responseStatus} = this.props;

        let alert;
        let table;
        switch (statusCode) {
            case(null):
                alert = null;
                break;
            case 200:
                alert = null;
                table = <TransactionsTable transactions={transactions} statusCode={responseStatus}></TransactionsTable>
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

                {table}
                {alert}

            </div>
        </div>);
    }

}
