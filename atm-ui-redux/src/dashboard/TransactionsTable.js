import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
};
const columns = [
    {
        name: 'Date',
        selector: 'date',
        sortable: true
    },
    {
        name: "Type",
        selector: "type",
        sortable: true,
    },
    {
        name: "Amount",
        selector: "amount",
        sortable: true,
        className: "dt-right",
    },
    {
        name: "Balance",
        selector: "balance",
        sortable: true,
    },
];

const TransactionsTable = ({ transactions }) => {
    return (
        <DataTable
            title="Account Transactions"
            columns={columns}
            data={transactions}
            defaultSortField="date"
        />
    );
};

export default TransactionsTable;
