export const LOAD_ACCOUNTS_SUCCESS = "LOAD_ACCOUNTS_SUCCESS";
export const loadAccountsSuccess = (accounts) => ({
    type: LOAD_ACCOUNTS_SUCCESS,
    payload: { accounts },
});

export const LOAD_ACCOUNTS_FAILURE = "LOAD_ACCOUNTS_FAILURE";
export const loadAccountsFailure = () => ({
    type: LOAD_ACCOUNTS_FAILURE,
});

export const LOAD_ACCOUNTS_IN_PROGRESS = "LOAD_ACCOUNTS_IN_PROGRESS";
export const loadAccountsInProgress = () => ({
    type: LOAD_ACCOUNTS_IN_PROGRESS,
});

export const LOAD_TRANSACTIONS_SUCCESS = "LOAD_TRANSACTIONS_SUCCESS";
export const loadTransactionsSuccess = (transactions) => ({
    type: LOAD_TRANSACTIONS_SUCCESS,
    payload: { transactions },
});

export const LOAD_TRANSACTIONS_FAILURE = "LOAD_TRANSACTIONS_FAILURE";
export const loadTransactionsFailure = () => ({
    type: LOAD_TRANSACTIONS_FAILURE,
});

export const LOAD_TRANSACTIONS_IN_PROGRESS = "LOAD_TRANSACTIONS_IN_PROGRESS";
export const loadTransactionsInProgress = () => ({
    type: LOAD_TRANSACTIONS_IN_PROGRESS,
});

export const SELECT_ACTIVE_ACCOUNT = "SELECT_ACTIVE_ACCOUNT";
export const selectActiveAccount = (account) => ({
    type: SELECT_ACTIVE_ACCOUNT,
    payload: { account },
});

export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const updateAccount = (account) => ({
    type: UPDATE_ACCOUNT,
    payload: { account },
});