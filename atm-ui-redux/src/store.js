import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    activeAccount,
    accounts,
    transactions,
    deposit,
    withdraw,
    transfer,
    createAccount,
} from "./dashboard/state/reducers";
import { login, register } from "./login/state/reducers";
import {
    routerReducer,
    routerMiddleware as reduxRouterMiddleware,
} from "react-router-redux";

const reducers = {
    activeAccount,
    accounts,
    transactions,
    deposit,
    withdraw,
    transfer,
    createAccount,
    login,
    register,
};

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({ ...reducers, routing: routerReducer });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = (history = {}) =>
    // createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, reduxRouterMiddleware(history))));
    createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk, reduxRouterMiddleware(history))
        )
    );
