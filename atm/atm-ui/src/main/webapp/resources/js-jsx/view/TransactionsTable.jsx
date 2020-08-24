const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
const columns = [

    {
        title: "Date",
        data: 'date',
        render: function(data) {
            var date = new Date(parseInt(data));
            return date.toLocaleDateString(undefined, options);
        }
    }, {
        title: "Type",
        data: 'type'
    }, {
        title: "Amount",
        data: 'amount',
        render: function(data, type, row, meta) {
            return (row.type == "Deposit" ? "+" : "-") + Number.parseFloat(data).toFixed(2);
        }
    }, {
        title: "Balance",
        data: 'balance',
        render: function(data) {
            return Number.parseFloat(data).toFixed(2);
        }
    }
];

class TransactionsTable extends React.Component {

    reloadTableData(transactions) {
        const table = $(this.refs.main).DataTable();
        table.clear();
        table.rows.add(transactions);
        table.draw();
    }

    componentDidMount() {
        $(this.refs.main).DataTable({data: this.props.transactions, columns, order: [[1, 'desc']]});
    }

    componentWillUnmount() {
        $(this.refs.main).DataTable().destroy(true);
    }
    componentWillReceiveProps(nextProps) {
        this.reloadTableData(nextProps.transactions);
        return false;
    }
    render() {
        return (<div>
            <table ref="main"/>
        </div>);
    }

}
