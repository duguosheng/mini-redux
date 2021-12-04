import React from "react";
import PropTypes from 'prop-types';

/*******   store   ********/
const validateAction = action => {
    if (!action || typeof action !== 'object' || Array.isArray(action)) {
        throw new Error('Action must be an object!');
    }

    if (typeof action.type === 'undefined') {
        throw new Error('Action must have a type!');
    }
};

export const createStore = (reducer) => {
    let state;              // 状态
    const subscribers = []; // 订阅者列表
    const store = {
        // 执行动作
        dispatch: action => {
            validateAction(action);
            state = reducer(state, action);
            // 调用subscribers中所有的回调函数
            subscribers.forEach(handler => handler());
        },
        // 获取状态
        getState: () => state,

        /**
         * 订阅函数
         * @param handler 指定的回调函数
         * @returns {(function(): void)|*} 返回用于解除订阅的函数
         */
        subscribe: handler => {
            subscribers.push(handler);
            // 返回unsubscribe解除订阅函数
            return () => {
                const index = subscribers.indexOf(handler);
                if (index > 0)
                    subscribers.splice(index, 1);
            };
        }
    };
    // 返回一个包含几个函数的对象
    store.dispatch({type: '@@redux/INIT'});
    return store;
};

/*******   Provider     ********/
export class Provider extends React.Component {
    // 在上下文中转换出store属性
    getChildContext() {
        return {
            store: this.props.store,
        };
    }

    render() {
        return this.props.children;
    }
}

Provider.childContextTypes = {
    store: PropTypes.object,
};

/*******     connect     ********/
// 箭头函数的闭包
export const connect = (
    mapStateToProps = () => ({}),
    mapDispatchToProps = () => ({})
) => Component => {
    class Connected extends React.Component {
        onStoreOrPropsChange(props) {
            // 解构赋值，上下文中的store将由Provider提供
            const {store} = this.context;
            const state = store.getState();
            const stateProps = mapStateToProps(state, props);
            const dispatchProps = mapDispatchToProps(store.dispatch, props);
            this.setState({
                ...stateProps,
                ...dispatchProps
            });
        }

        componentWillMount() {
            const {store} = this.context;
            this.onStoreOrPropsChange(this.props);
            this.unsubscribe = store.subscribe(() =>
                this.onStoreOrPropsChange(this.props));
        }

        componentWillReceiveProps(nextProps) {
            this.onStoreOrPropsChange(nextProps);
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        // 将所有的属性和组件绑定在一起
        render() {
            return <Component {...this.props} {...this.state}/>;
        }
    }

    Connected.contextTypes = {
        store: PropTypes.object,
    };

    return Connected;
}
