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






