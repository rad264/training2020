const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
};
const columns = [
    {
        title: "Date",
        data: "date",
        width: "25%",
        render: function (data, type, row) {
            if (type == "sort" || type == "type") return data;
            var date = new Date(parseInt(data));
            return date.toLocaleDateString(undefined, options);
        },
    },
    {
        title: "Type",
        data: "type",
        width: "29%",
        className: "boldType",
    },
    {
        title: "Amount",
        data: "amount",
        width: "23%",
        className: "dt-right",
        render: function (data, type, row, meta) {
            return (
                (row.type == "Deposit" ? "+" : "-") +
                Number.parseFloat(data).toFixed(2)
            );
        },
    },
    {
        title: "Balance",
        data: "balance",
        width: "23%",
        className: "dt-right",
        render: function (data) {
            return Number.parseFloat(data).toFixed(2);
        },
    },
];

class TransactionsTable extends React.Component {
    reloadTableData(transactions) {
        const table = $(this.refs.main).DataTable();
        table.clear();
        table.rows.add(transactions);
        table.draw();
    }

    componentDidMount() {
        $(this.refs.main).DataTable({
            data: this.props.transactions,
            columns,
            className: "datatables-width",
            order: [[0, "desc"]],
        });
    }

    componentWillUnmount() {
        $(this.refs.main).DataTable().destroy(true);
    }
    componentWillReceiveProps(nextProps) {
        this.reloadTableData(nextProps.transactions);
        return false;
    }
    render() {
        return (
            <div>
                <table ref="main" class="table table-hover"></table>
            </div>
        );
    }
}
