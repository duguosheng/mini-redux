import React from "react";
import * as ReactDOM from "react-dom";
import NoteAppContainer from "./containers";
import {reducer} from "./reducer";
import {Provider, createStore} from "./miniredux";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <NoteAppContainer/>
    </Provider>,
    document.getElementById('root')
);
