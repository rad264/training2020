import { createSelector } from "reselect";

export const getActiveAccount = (state) => state.activeAccount.data;
export const getActiveAccountLoading = (state) => state.activeAccount.isLoading;

export const getAccounts = (state) => state.accounts.data;
export const getAccountsLoading = (state) => state.accounts.isLoading;

export const getTransactions = (state) => state.transactions.data;
export const getTransactionsLoading = (state) => state.transactions.isLoading;


// export const getIncompleteTodos = createSelector(getTodos, (todos) =>
//     todos.filter((todo) => !todo.isCompleted)
// );

// export const getCompletedTodos = createSelector(getTodos, (todos) =>
//     todos.filter((todo) => todo.isCompleted)
// );
