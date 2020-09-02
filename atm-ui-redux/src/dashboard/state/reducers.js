import {
    LOAD_ACCOUNTS_SUCCESS,
    LOAD_ACCOUNTS_FAILURE,
    LOAD_ACCOUNTS_IN_PROGRESS,
    LOAD_TRANSACTIONS_SUCCESS,
    LOAD_TRANSACTIONS_FAILURE,
    LOAD_TRANSACTIONS_IN_PROGRESS,
    SELECT_ACTIVE_ACCOUNT,
    UPDATE_ACCOUNT,
    CREATE_ACCOUNT,
} from "./actions";

const initAccount = {
    accountNumber: "Select An Account",
    accountType: "",
    balance: 0,
};

const initialStateAccount = { isLoading: false, data: initAccount };
export const activeAccount = (state = initialStateAccount, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_ACCOUNTS_SUCCESS: {
            const { accounts } = payload;
            return {
                ...state,
                isLoading: false,
                data: accounts ? accounts[0] : state.data,
            };
        }
        case SELECT_ACTIVE_ACCOUNT:
            const { account } = payload;
            return {
                ...state,
                isLoading: false,
                data: account,
            };
        case UPDATE_ACCOUNT:
            const { account: updatedAccount } = payload;
            return {
                ...state,
                data:
                    state.data.accountNumber === updatedAccount.accountNumber
                        ? updatedAccount
                        : state.data,
            };
        case CREATE_ACCOUNT: {
            const { account } = payload;
            return { ...state, data: account };
        }
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
        case UPDATE_ACCOUNT:
            const { account: updatedAccount } = payload;
            return {
                ...state,
                data: state.data.map((account) => {
                    if (
                        account.accountNumber === updatedAccount.accountNumber
                    ) {
                        return updatedAccount;
                    }
                    return account;
                }),
            };
        case CREATE_ACCOUNT: {
            const { account } = payload;
            return { ...state, data: state.data.concat(account) };
        }
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
