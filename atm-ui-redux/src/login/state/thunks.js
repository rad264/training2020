import { push } from "react-router-redux";
import {
    loadUserSuccess,
    loadUserFailure,
    loadUserInProgress,
    createUserSuccess,
    createUserInProgress,
    createUserFailure,
} from "./actions";

const url = "http://localhost:8080/atm-api";

export const loadUser = (userId) => async (dispatch, getState) => {
    try {
        dispatch(loadUserInProgress());
        const response = await fetch(url + `/users/${userId}`, {
            method: "get",
        }).then(handleResponse);

        const user = await response.json();

        dispatch(loadUserSuccess(user.userId));
        dispatch(push("/dashboard"));
    } catch (e) {
        dispatch(loadUserFailure(e.message));
    }
};

export const postCreateUserRequest = (userId) => async (dispatch) => {
    try {
        dispatch(createUserInProgress());
        const body = userId;
        const response = await fetch(url + "/users", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body,
        }).then(handleResponse);
        dispatch(createUserSuccess(userId));
    } catch (e) {
        dispatch(createUserFailure(e.message));
    }
};

export const handleResponse = (response) => {
    if (!response.ok) throw Error(response.status);
    return response;
};

export const displayAlert = (text) => () => {
    alert(text);
};
