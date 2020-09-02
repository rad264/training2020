import { createSelector } from "reselect";

export const getUserId = (state) => state.loggedInUser.data;
export const getUserIdLoading = (state) => state.loggedInUser.isLoading;

export const getActiveAccount = (state) => state.activeAccount.data;
export const getActiveAccountLoading = (state) => state.activeAccount.isLoading;

export const getAccounts = (state) => state.accounts.data;
export const getAccountsLoading = (state) => state.accounts.isLoading;

export const getTransactions = (state) => state.transactions.data;
export const getTransactionsLoading = (state) => state.transactions.isLoading;