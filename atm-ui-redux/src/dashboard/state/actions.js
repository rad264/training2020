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
export const loadTransactionsFailure = (error) => ({
    type: LOAD_TRANSACTIONS_FAILURE,
    payload: { error },
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

export const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS";
export const createAccountSuccess = (account) => ({
    type: CREATE_ACCOUNT_SUCCESS,
    payload: { account },
});

export const CREATE_ACCOUNT_FAILURE = "CREATE_ACCOUNT_FAILURE";
export const createAccountFailure = (error) => ({
    type: CREATE_ACCOUNT_FAILURE,
    payload: { error },
});

export const CREATE_ACCOUNT_IN_PROGRESS = "CREATE_ACCOUNT_IN_PROGRESS";
export const createAccountInProgress = () => ({
    type: CREATE_ACCOUNT_IN_PROGRESS,
});

export const DEPOSIT_SUCCESS = "DEPOSIT_SUCCESS";
export const depositSuccess = (account) => ({
    type: DEPOSIT_SUCCESS,
    payload: { account },
});

export const DEPOSIT_FAILURE = "DEPOSIT_FAILURE";
export const depositFailure = (error) => ({
    type: DEPOSIT_FAILURE,
    payload: { error },
});

export const DEPOSIT_IN_PROGRESS = "DEPOSIT_IN_PROGRESS";
export const depositInProgress = () => ({
    type: DEPOSIT_IN_PROGRESS,
});
export const WITHDRAW_SUCCESS = "WITHDRAW_SUCCESS";
export const withdrawSuccess = (account) => ({
    type: WITHDRAW_SUCCESS,
    payload: { account },
});

export const WITHDRAW_FAILURE = "WITHDRAW_FAILURE";
export const withdrawFailure = (error) => ({
    type: WITHDRAW_FAILURE,
    payload: { error },
});

export const WITHDRAW_IN_PROGRESS = "WITHDRAW_IN_PROGRESS";
export const withdrawInProgress = () => ({
    type: WITHDRAW_IN_PROGRESS,
});
export const TRANSFER_SUCCESS = "TRANSFER_SUCCESS";
export const transferSuccess = (accounts) => ({
    type: TRANSFER_SUCCESS,
    payload: { accounts },
});

export const TRANSFER_FAILURE = "TRANSFER_FAILURE";
export const transferFailure = (error) => ({
    type: TRANSFER_FAILURE,
    payload: { error },
});

export const TRANSFER_IN_PROGRESS = "TRANSFER_IN_PROGRESS";
export const transferInProgress = () => ({
    type: TRANSFER_IN_PROGRESS,
});
