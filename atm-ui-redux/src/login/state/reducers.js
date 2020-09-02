import {
    LOAD_USER_IN_PROGRESS,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    CREATE_USER_SUCCESS,
    CREATE_USER_IN_PROGRESS,
    CREATE_USER_FAILURE,
} from "./actions";

const initialStateLogin = {
    isLoading: false,
    data: {},
    error: false,
    message: null,
};

export const login = (state = initialStateLogin, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_USER_SUCCESS: {
            const { user } = payload;
            return {
                ...state,
                isLoading: false,
                data: user,
                error: false,
                message: null,
            };
        }
        case LOAD_USER_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
                error: false,
                message: null,
            };
        case LOAD_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: "User Not Found.",
            };
        default:
            return state;
    }
};

const initialStateRegister = {
    isLoading: false,
    error: false,
    message: null,
};

export const register = (state = initialStateRegister, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_USER_SUCCESS: {
            const { user } = payload;
            return {
                ...state,
                isLoading: false,
                error: false,
                message: `User "${user}" Registration Success.`,
            };
        }
        case CREATE_USER_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
                error: false,
                message: null,
            };
        case CREATE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: "User Already Exists.",
            };
        default:
            return state;
    }
};
