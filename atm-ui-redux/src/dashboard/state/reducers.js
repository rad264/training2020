import {
    LOAD_ACCOUNT_SUCCESS,
    LOAD_ACCOUNT_FAILURE,
    LOAD_ACCOUNT_IN_PROGRESS,
    LOAD_ACCOUNTS_SUCCESS,
    LOAD_ACCOUNTS_FAILURE,
    LOAD_ACCOUNTS_IN_PROGRESS,
    LOAD_TRANSACTIONS_SUCCESS,
    LOAD_TRANSACTIONS_FAILURE,
    LOAD_TRANSACTIONS_IN_PROGRESS,
} from "./actions";

const initialStateAccount = { isLoading: false, data: {} };
export const account = (state = initialStateAccount, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_ACCOUNT_SUCCESS: {
            const { account } = payload;
            return {
                ...state,
                isLoading: false,
                data: account,
            };
        }
        case LOAD_ACCOUNT_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case LOAD_ACCOUNT_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

const initialStateAccounts = { isLoading: false, data: [] };
export const accounts = (state = initialStateAccounts, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_ACCOUNTS_SUCCESS: {
            const { accounts } = payload;
            return {
                ...state,
                isLoading: false,
                data: accounts,
            };
        }
        case LOAD_ACCOUNTS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case LOAD_ACCOUNTS_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

const initialStateTransactions = { isLoading: false, data: [] };
export const transactions = (state = initialStateTransactions, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_TRANSACTIONS_SUCCESS: {
            const { transactions } = payload;
            return {
                ...state,
                isLoading: false,
                data: transactions,
            };
        }
        case LOAD_TRANSACTIONS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case LOAD_TRANSACTIONS_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
