import { push } from "react-router-redux";
import {
    loadUserSuccess,
    loadUserFailure,
    loadUserInProgress,
} from "./actions";

const url = "http://localhost:8080/atm-api";

export const loadUser = (userId) => async (dispatch, getState) => {
    try {
        dispatch(loadUserInProgress());
        const response = await fetch(url + `/users/${userId}`, {
            method: "get",
        });
        const user = await response.json();

        dispatch(loadUserSuccess(user.userId));
        dispatch(push("/dashboard"));
    } catch (e) {
        dispatch(loadUserFailure());
        dispatch(displayAlert(e));
    }
};

export const postCreateUserRequest = (userId) => async (dispatch) => {
    try {
        const body = userId;
        const response = await fetch(url + "/users", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body,
        });
        console.log("Create User Success");
        // const user = await response.json();
        // dispatch(createAccount(account));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

export const displayAlert = (text) => () => {
    alert(text);
};
