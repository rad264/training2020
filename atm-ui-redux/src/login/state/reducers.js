import {
    LOAD_USER_IN_PROGRESS,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
} from "./actions";

const initialState = { isLoading: false, data: {} };

export const loggedInUser = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_USER_SUCCESS: {
            const { user } = payload;
            return {
                ...state,
                isLoading: false,
                data: user,
            };
        }
        case LOAD_USER_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case LOAD_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
