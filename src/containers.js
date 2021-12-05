import {connect} from "./miniredux";
import NoteApp from "./components";
import {api} from "./fakeapi";

import {
    CREATE_NOTE,
    UPDATE_NOTE,
    OPEN_NOTE,
    CLOSE_NOTE
} from "./reducer";

const createNote = () => {
    return (dispatch) => {
        dispatch({type: CREATE_NOTE});
        api.createNote().then(({id}) => {
            dispatch({
                type: CREATE_NOTE,
                id
            });
        });
    }
}

const mapStateToProps = state => ({
    notes: state.notes,
    openNoteId: state.openNoteId,
});

const mapDispatchToProps = dispatch => ({
    onAddNote: () => dispatch(createNote()),

    onChangeNote: (id, content) => dispatch({
        type: UPDATE_NOTE, id, content
    }),

    onOpenNote: (id) => dispatch({type: OPEN_NOTE, id}),

    onCloseNote: () => dispatch({type: CLOSE_NOTE}),

});

const NoteAppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteApp);

export default NoteAppContainer;