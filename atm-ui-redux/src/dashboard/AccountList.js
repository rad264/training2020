import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AccountCard from "./AccountCard";

import { getActiveAccount } from "./state/selectors";
import { selectActiveAccount } from "./state/actions";

const AccountList = ({ statusCode, accounts, onAccountSelect }) => {
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
});

const mapDispatchToProps = (dispatch) => ({
    onAccountSelect: (account) => dispatch(selectActiveAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
