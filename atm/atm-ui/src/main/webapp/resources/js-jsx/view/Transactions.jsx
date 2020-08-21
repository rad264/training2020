class Transactions extends React.Component {

    componentDidMount() {
        // $('#table_id').DataTable({
        //     "columns": [
        //         {
        //             "data": "date"
        //         }, {
        //             "data": "type"
        //         }, {
        //             "data": "amount"
        //         }, {
        //             "data": "balance"
        //         }
        //     ]
        // });
    }

    // componentDidUpdate() {
    //     const table = $('.data-table-wrapper')
    //                   .find('table')
    //                   .DataTable();
    //     table.clear();
    //     // table.rows.add(names);
    //     table.draw();
    // }

    shouldComponentUpdate() {
        $("#table_id").DataTable();
    }

    // componentWillUnmount() {
    //     $('.data-table-wrapper').find('table').DataTable().destroy(true);
    // }

    render() {

        this.transactions = this.props.transactions;
        var transactionTableRows = [];

        if (this.transactions) {
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            this.transactions.forEach(function(e) {
                var date = (new Date(parseInt(e.date))).toLocaleDateString(undefined, options);
                var amount = Number.parseFloat(e.amount).toFixed(2);
                var balance = Number.parseFloat(e.balance).toFixed(2);
                transactionTableRows.unshift(<Transaction date={date} type={e.type} amount={amount} balance={balance}/>);
            })
        }

        return (<div class="card mb-3">
            <div class="card-header smbc-color-primary border-success">Transactions</div>
            <div class="card-body">

                <table id="table_id" class="display">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Balance</th>
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
