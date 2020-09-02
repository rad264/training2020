import { createSelector } from "reselect";

export const getLoginError = (state) => state.login.error;
export const getLoginMessage = (state) => state.login.message;

export const getRegisterError = (state) => state.register.error;
export const getRegisterMessage = (state) => state.register.message;
