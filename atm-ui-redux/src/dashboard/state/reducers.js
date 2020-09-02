import {
    LOAD_ACCOUNTS_SUCCESS,
    LOAD_ACCOUNTS_FAILURE,
    LOAD_ACCOUNTS_IN_PROGRESS,
    LOAD_TRANSACTIONS_SUCCESS,
    LOAD_TRANSACTIONS_FAILURE,
    LOAD_TRANSACTIONS_IN_PROGRESS,
    SELECT_ACTIVE_ACCOUNT,
    UPDATE_ACCOUNT,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_IN_PROGRESS,
    DEPOSIT_IN_PROGRESS,
    DEPOSIT_SUCCESS,
    DEPOSIT_FAILURE,
    WITHDRAW_SUCCESS,
    WITHDRAW_IN_PROGRESS,
    WITHDRAW_FAILURE,
    TRANSFER_SUCCESS,
    TRANSFER_IN_PROGRESS,
    TRANSFER_FAILURE,
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
        case CREATE_ACCOUNT_SUCCESS: {
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
        case CREATE_ACCOUNT_SUCCESS: {
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

const initialStateAction = {
    isLoading: false,
    error: false,
    message: null,
};
export const deposit = (state = initialStateAction, action) => {
    const { type, payload } = action;

    switch (type) {
        case DEPOSIT_SUCCESS: {
            const { account } = payload;
            return {
                ...state,
                isLoading: false,
                error: false,
                message: `Deposit for "${account.accountNumber}" Success.`,
            };
        }
        case DEPOSIT_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
                error: false,
                message: null,
            };
        case DEPOSIT_FAILURE:
            const { error } = payload;
            let errorMessage;
            switch (error) {
                case "400":
                    errorMessage = "Negative Amount Invalid.";
                    break;
                default:
                    errorMessage = "Unexpected error.";
            }
            return {
                ...state,
                isLoading: false,
                error: true,
                message: errorMessage,
            };
        default:
            return state;
    }
};
export const withdraw = (state = initialStateAction, action) => {
    const { type, payload } = action;

    switch (type) {
        case WITHDRAW_SUCCESS: {
            const { account } = payload;
            return {
                ...state,
                isLoading: false,
                error: false,
                message: `Withdraw for "${account.accountNumber}" Success.`,
            };
        }
        case WITHDRAW_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
                error: false,
                message: null,
            };
        case WITHDRAW_FAILURE:
            const { error } = payload;
            let errorMessage;
            switch (error) {
                case "400":
                    errorMessage = "Negative Amount Invalid.";
                    break;
                case "403":
                    errorMessage = "Insufficient Funds.";
                    break;
                default:
                    errorMessage = "Unexpected error.";
            }
            return {
                ...state,
                isLoading: false,
                error: true,
                message: errorMessage,
            };
        default:
            return state;
    }
};
export const transfer = (state = initialStateAction, action) => {
    const { type, payload } = action;

    switch (type) {
        case TRANSFER_SUCCESS: {
            const { accounts } = payload;
            return {
                ...state,
                isLoading: false,
                error: false,
                message: `Transfer from "${accounts[0].accountNumber}" to "${accounts[1].accountNumber}" Success.`,
            };
        }
        case TRANSFER_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
                error: false,
                message: null,
            };
        case TRANSFER_FAILURE:
            const { error } = payload;
            let errorMessage;
            switch (error) {
                case "400":
                    errorMessage = "Negative Amount Invalid.";
                    break;
                case "403":
                    errorMessage = "Insufficient Funds.";
                    break;
                default:
                    errorMessage = "Unexpected error.";
            }
            return {
                ...state,
                isLoading: false,
                error: true,
                message: errorMessage,
            };
        default:
            return state;
    }
};
export const createAccount = (state = initialStateAction, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ACCOUNT_SUCCESS: {
            const { account } = payload;
            return {
                ...state,
                isLoading: false,
                error: false,
                message: `${account.accountType} Account "${account.accountNumber}" Create Success.`,
            };
        }
        case CREATE_ACCOUNT_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
                error: false,
                message: null,
            };
        case CREATE_ACCOUNT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: "Create Account Failed.",
            };
        default:
            return state;
    }
};
