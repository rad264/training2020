export const LOAD_ACCOUNT_SUCCESS = "LOAD_ACCOUNT_SUCCESS";
export const loadAccountSuccess = (account) => ({
    type: LOAD_ACCOUNT_SUCCESS,
    payload: { account },
});

export const LOAD_ACCOUNT_FAILURE = "LOAD_ACCOUNT_FAILURE";
export const loadAccountFailure = () => ({
    type: LOAD_ACCOUNT_FAILURE,
});

export const LOAD_ACCOUNT_IN_PROGRESS = "LOAD_ACCOUNT_IN_PROGRESS";
export const loadAccountInProgress = () => ({
    type: LOAD_ACCOUNT_IN_PROGRESS,
});

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