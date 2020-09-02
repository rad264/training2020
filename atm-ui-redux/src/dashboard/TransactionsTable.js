import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";

const customStyles = {
    headCells: {
        style: {
            fontWeight: "bold",
        },
    },
};

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
};
const columns = [
    {
        name: "Date",
        selector: "date",
        sortable: true,
        cell: (row) => {
            var date = new Date(parseInt(row.date));
            return date.toLocaleDateString(undefined, options);
        },
    },
    {
        name: "Type",
        selector: "type",
        sortable: true,
        style: {
            fontWeight: "bold",
        },
    },
    {
        name: "Amount",
        selector: "amount",
        sortable: true,
        cell: (row) => {
            return (
                (row.type == "Deposit" ? "+" : "-") +
                Number.parseFloat(row.amount).toFixed(2)
            );
        },
    },
    {
        name: "Balance",
        selector: "balance",
        sortable: true,
        cell: (row) => {
            return Number.parseFloat(row.balance).toFixed(2);
        },
    },
];

const TransactionsTable = ({ isLoading, transactions }) => {
    return (
        <DataTable
            title="Account Transactions"
            columns={columns}
            data={transactions}
            defaultSortField="date"
            progressPending={isLoading}
            defaultSortAsc={false}
            highlightOnHover
            pagination
            customStyles={customStyles}
        />
    );
};

export default TransactionsTable;
