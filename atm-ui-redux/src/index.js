import React from "react";
import ReactDOM from "react-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import App from "./App.js";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

const store = configureStore(browserHistory);
// const persistor = persistStore(store);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        {/* <PersistGate loading={<div>Loading...</div>} persistor={persistor}> */}
            <App history={history} />
        {/* </PersistGate> */}
    </Provider>,
    document.getElementById("root")
);
