// 笔记编辑区域
const NoteEditor = ({note, onChangeNote, onCloseNote}) => (
    <div>
        <div>
           <textarea
               className="editor-content"
               autoFocus
               value={note.content}
               onChange={event => onChangeNote(note.id, event.target.value)}
               rows={10} cols={80}/>
        </div>
        <button className="editor-button" onClick={onCloseNote}>Close</button>
    </div>
);

// 笔记标题
const NoteTitle = ({note}) => {
    // 用空字符替换正则匹配到的字符
    const title = note.content.split('\n')[0].replace(/^\s+|\s+$/g, '')
    if (title === '')
        return <i>Untitled</i>  // 斜体文本
    return <span>{title}</span>
};

// 笔记链接（点击后展开目标笔记）
const NoteLink = ({note, onOpenNote}) => (
    <li className="note-list-item">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" onClick={() => onOpenNote(note.id)}>
            <NoteTitle note={note}/>
        </a>
    </li>
);

// 笔记列表
const NoteList = ({notes, onOpenNote}) => (
    <ul className="note-list">
        {
            // 将笔记展开为NoteLink组件
            Object.keys(notes).map(id =>
                <NoteLink
                    key={id}
                    note={notes[id]}
                    onOpenNote={onOpenNote}/>
            )
        }
    </ul>
);

const NoteApp = (
    {notes, openNoteId, onAddNote, onChangeNote, onOpenNote, onCloseNote}
) => (
    <div>
        {
            // 点击了close按键后触发CLOSE_NOTE会将openNoteId设为null
            openNoteId ?
                // 显示编辑区
                <NoteEditor
                    note={notes[openNoteId]}
                    onChangeNote={onChangeNote}
                    onCloseNote={onCloseNote}/> :
                // 显示笔记列表
                <div>
                    <NoteList
                        notes={notes}
                        onOpenNote={onOpenNote}/>
                    <button
                        className="editor-button"
                        onClick={onAddNote}>
                        New Note
                    </button>
                </div>
        }
    </div>
)

export default NoteApp;
