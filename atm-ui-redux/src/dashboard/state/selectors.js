import { createSelector } from "reselect";

export const getUserId = (state) => state.login.data;
export const getUserIdLoading = (state) => state.login.isLoading;

export const getActiveAccount = (state) => state.activeAccount.data;
export const getActiveAccountLoading = (state) => state.activeAccount.isLoading;

export const getAccounts = (state) => state.accounts.data;
export const getAccountsLoading = (state) => state.accounts.isLoading;

export const getTransactions = (state) => state.transactions.data;
export const getTransactionsLoading = (state) => state.transactions.isLoading;

export const getDepositError = (state) => state.deposit.error;
export const getDepositMessage = (state) => state.deposit.message;

export const getWithdrawError = (state) => state.withdraw.error;
export const getWithdrawMessage = (state) => state.withdraw.message;

export const getTransferError = (state) => state.transfer.error;
export const getTransferMessage = (state) => state.transfer.message;

export const getCreateAccountError = (state) => state.createAccount.error;
export const getCreateAccountMessage = (state) => state.createAccount.message;
