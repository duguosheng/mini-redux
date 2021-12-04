import React from "react";
import * as ReactDOM from "react-dom";
import NoteAppContainer from "./containers";
import {createStore, reducer} from "./reducer";

const store = createStore(reducer);

ReactDOM.render(
    <NoteAppContainer store={store}/>,
    document.getElementById('root')
);
