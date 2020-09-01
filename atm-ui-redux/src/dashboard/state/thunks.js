import {
    loadAccountsSuccess,
    loadAccountsFailure,
    loadAccountsInProgress,
    loadTransactionsSuccess,
    loadTransactionsFailure,
    loadTransactionsInProgress,
    postDeposit,
} from "./actions";

const url = "http://localhost:8080/atm-api/";

export const loadAccounts = (userId) => async (dispatch, getState) => {
    try {
        dispatch(loadAccountsInProgress());
        const response = await fetch(url + `users/${userId}/accounts`, {
            method: "get",
        });
        const accounts = await response.json();

        dispatch(loadAccountsSuccess(accounts));
    } catch (e) {
        dispatch(loadAccountsFailure());
        dispatch(displayAlert(e));
    }
};

export const loadTransactions = (accountNumber) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(loadTransactionsInProgress());
        const response = await fetch(
            url + `accounts/${accountNumber}/transactions`,
            {
                method: "get",
            }
        );
        const transactions = await response.json();
        dispatch(loadTransactionsSuccess(transactions));
    } catch (e) {
        dispatch(loadTransactionsFailure());
        dispatch(displayAlert(e));
    }
};

export const postDepositRequest = (data) => async (dispatch) => {
    try {
        const { accountNumber, depositAmount } = data;
        const body = depositAmount;
        const response = await fetch(url + `accounts/${accountNumber}/deposits`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body,
        });
        const res = await response;
        dispatch(loadAccounts("jwong"));
        // dispatch(postDeposit(data));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

export const displayAlert = (text) => () => {
    alert(text);
};
