import React from "react";
import NoteApp from "./components";

import {
    CREATE_NOTE,
    UPDATE_NOTE,
    OPEN_NOTE,
    CLOSE_NOTE
} from "./reducer";

class NoteAppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.store.getState();
    }

    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() =>
            this.setState(this.props.store.getState())
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onAddNote = () => {
        this.props.store.dispatch({type: CREATE_NOTE});
    }

    onChangeNote = (id, content) => {
        this.props.store.dispatch({type: UPDATE_NOTE, id, content});
    }

    onOpenNote = (id) => {
        this.props.store.dispatch({type: OPEN_NOTE, id});
    }

    onCloseNote = () => {
        this.props.store.dispatch({type: CLOSE_NOTE});
    }

    render() {
        return (
            <NoteApp
                {...this.state}
                onAddNote={this.onAddNote}
                onChangeNote={this.onChangeNote}
                onOpenNote={this.onOpenNote}
                onCloseNote={this.onCloseNote}/>
        );
    }
}

export default NoteAppContainer;