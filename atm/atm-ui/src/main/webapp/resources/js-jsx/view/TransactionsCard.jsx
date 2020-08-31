class TransactionsCard extends React.Component {
    render() {
        const { statusCode, transactions, responseStatus } = this.props;

        let table = null;
        if (statusCode == 200)
            table = (
                <TransactionsTable
                    transactions={transactions}
                    statusCode={responseStatus}
                ></TransactionsTable>
            );

        return (
            <div class="card mb-3">
                <div class="card-header smbc-color-primary border-success">
                    Transactions
                </div>
                <div class="card-body">
                    {table}
                    <Alert statusCode={statusCode} action={"Transactions"}></Alert>
                </div>
            </div>
        );
    }
}
