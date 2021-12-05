import React from "react";
import * as ReactDOM from "react-dom";
import NoteAppContainer from "./containers";
import {reducer} from "./reducer";
import {Provider, createStore} from "./miniredux";

// 柯里化传参
// 延时中间件
const delayMiddleWare = () => next => action => {
    setTimeout(() => {
        next(action);
    }, 1000);
};

// 日志中间件
const loggingMiddleware = ({getState}) => next => action => {
    console.info('before', getState());
    console.info('action', action);
    const result = next(action);
    console.info('after', getState());
    return result;
};

// thunk是function的另一个名称，但它表示这个函数包装了一些稍后才会完成的工作
const thunkMiddleware = ({dispatch, getState}) => next => action => {
    if (typeof action === 'function')
        return action(dispatch, getState);
    return next(action);
};


// 聚合中间件
const applyMiddleware = (...middlewares) => store => {
    if (middlewares.length === 0)
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
    thunkMiddleware,
    loggingMiddleware
));

ReactDOM.render(
    <Provider store={store}>
        <NoteAppContainer/>
    </Provider>,
    document.getElementById('root')
);
