class Transactions extends React.Component {

    render() {

        this.transactions = this.props.transactions;
        var transactionTableRows = [];

        if (this.transactions) {
            this.transactions.forEach(function(e) {
                transactionTableRows.push(<Transaction date={e.date} type={e.type} amount={e.amount} balance={e.balance}/>);
            })
        }

        return (<div class="card border-primary mb-3">
            <div class="card-header bg-transparent border-primary">Transactions</div>
            <div class="card-body text-primary">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col" colspan="2">Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionTableRows}
                    </tbody>
                </table>
            </div>
        </div>);
    }

}
