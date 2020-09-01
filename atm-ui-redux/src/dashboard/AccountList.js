import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AccountCard from "./AccountCard";

import { getActiveAccount, getAccounts } from "./state/selectors";
import { selectActiveAccount } from "./state/actions";
import { loadAccounts, loadTransactions } from "./state/thunks";

const AccountList = ({ statusCode, accounts, startLoadingAccounts, onAccountSelect }) => {
    useEffect(() => {
        startLoadingAccounts();
    }, []);
    return (
        <div>
            {accounts.map((account, i) => (
                <AccountCard
                    key={i}
                    account={account}
                    onAccountSelect={onAccountSelect}
                />
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

const mapStateToProps = (state) => ({
    activeAccount: getActiveAccount(state),
    accounts: getAccounts(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingAccounts: () => dispatch(loadAccounts("jwong")),
    onAccountSelect: (account) => {
        dispatch(selectActiveAccount(account))
        dispatch(loadTransactions(account.accountNumber))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
