export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const OPEN_NOTE = 'OPEN_NOTE';
export const CLOSE_NOTE = 'CLOSE_NOTE';

export const initialState = {
    nextNoteId: 1,
    openNoteId: null,
    notes: {},
};

const handlers = {
    [CREATE_NOTE]: (state, action) => {
        const id = state.nextNoteId;
        const newNote = {
            id,
            content: '',
        };
        // 带有新节点的state
        return {
            ...state,
            nextNoteId: id + 1,
            openNoteId: id,
            notes: {
                ...state.notes,
                [id]: newNote,
            }
        };
    },
    [UPDATE_NOTE]: (state, action) => {
        const {id, content} = action;
        // 将指定索引的note展开，并修改其content
        const editedNote = {
            ...state.notes[id],
            content,
        };
        // 更新后的节点
        return {
            ...state,
            notes: {
                ...state.notes,
                [id]: editedNote,
            }
        };
    },
    [OPEN_NOTE]: (state, action) => ({
        ...state,
        openNoteId: action.id,
    }),
    [CLOSE_NOTE]:(state, action)=>({
        ...state,
        openNoteId: null,
    }),
};

// reducer: 根据state和action返回新的state
// 必须是纯函数
export const reducer = (state = initialState, action) => {
    if (handlers[action.type]) {
        return handlers[action.type](state, action);
    }
    return state;
}


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




