import { createSelector } from "reselect";

export const getUserId = (state) => state.loggedInUser.data;
export const getUserIdLoading = (state) => state.loggedInUser.isLoading;