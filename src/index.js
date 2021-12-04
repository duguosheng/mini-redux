import * as ReactDOM from "react-dom";

const initialState = {
    nextNodeId: 1,
    notes: {}
}

window.state = initialState;

// 添加笔记
const onAddNote = () => {
    const id = window.state.nextNodeId;
    window.state.notes[id] = {
        id,
        content: ''
    };
    window.state.nextNodeId++;
    renderApp();
}

const NoteApp = ({notes}) => (
    <div>
        {/*无序列表*/}
        <ul className="note-list">
            {
                // 渲染每一个笔记条目
                Object.keys(notes).map(id => (
                    // 显然这里应该渲染比仅仅是id更有趣的事情
                    <li className="note-list-item" key={id}>{id}</li>
                ))
            }
        </ul>
        <button className="editor-button" onClick={onAddNote}>New note</button>
    </div>
)

const renderApp = () => {
    ReactDOM.render(
        <NoteApp notes={window.state.notes}/>,
        document.getElementById('root')
    );
};

renderApp();
