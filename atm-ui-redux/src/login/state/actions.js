export const LOAD_USER_IN_PROGRESS = "LOAD_USER_IN_PROGRESS";
export const loadUserInProgress = () => ({
    type: LOAD_USER_IN_PROGRESS,
});

export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const loadUserSuccess = (user) => ({
    type: LOAD_USER_SUCCESS,
    payload: { user },
});

export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";
export const loadUserFailure = (error) => ({
    type: LOAD_USER_FAILURE,
    payload: { error },
});

export const CREATE_USER_IN_PROGRESS = "CREATE_USER_IN_PROGRESS";
export const createUserInProgress = () => ({
    type: CREATE_USER_IN_PROGRESS,
});

export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const createUserSuccess = (user) => ({
    type: CREATE_USER_SUCCESS,
    payload: { user },
});

export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const createUserFailure = (error) => ({
    type: CREATE_USER_FAILURE,
    payload: { error },
});
