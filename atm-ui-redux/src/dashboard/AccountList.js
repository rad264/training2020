import React from "react";
import styled from "styled-components";
import AccountCard from "./AccountCard";

const AccountList = ({ statusCode, accounts }) => {
    return (
        <div>
            {accounts.map((account, i) => (
                <AccountCard key={i} account={account} />
            ))}
            <div>
                <h5>Total Balance: </h5>
                <h5>
                    {accounts.reduce((a, b) => a + b.balance, 0).toFixed(2)}
                </h5>
            </div>
        </div>
    );
};

export default AccountList;
