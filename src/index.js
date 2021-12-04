import React from "react";
import * as ReactDOM from "react-dom";
import NoteAppContainer from "./containers";
import {reducer} from "./reducer";
import {createStore} from "./miniredux";

const store = createStore(reducer);

ReactDOM.render(
    <NoteAppContainer store={store}/>,
    document.getElementById('root')
);
