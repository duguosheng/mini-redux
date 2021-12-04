import React from "react";
import * as ReactDOM from "react-dom";
import NoteAppContainer from "./containers";
import {reducer} from "./reducer";
import {Provider, createStore} from "./miniredux";

// todo: 如何获得的action
const delayMiddleWare = () => next => action => {
    setTimeout(() => {
        next(action);
    }, 1000);
};

const loggingMiddleware = ({getState}) => next => action => {
    console.info('before', getState());
    console.info('action', action);
    const result = next(action);
    console.info('after', getState());
    return result;
}

// 聚合中间件
const applyMiddleware = (...middlewares) => store => {
    if (middlewares.length === 0)
        // todo
        return dispatch => dispatch;
    if (middlewares.length === 1)
        return middlewares[0](store);
    const boundMiddlewares = middlewares.map(middleware =>
        middleware(store)
    );
    return boundMiddlewares.reduce((a, b) =>
        next => a(b(next))
    )
}

const store = createStore(reducer, applyMiddleware(
    delayMiddleWare,
    loggingMiddleware
));

ReactDOM.render(
    <Provider store={store}>
        <NoteAppContainer/>
    </Provider>,
    document.getElementById('root')
);
