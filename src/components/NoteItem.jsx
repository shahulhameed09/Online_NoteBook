import React, { useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext'

const NoteItem = (props) => {
    let context = useContext(NoteContext);
    const { note, updateNote } = props
    return (
        <div className="col-md-3 my-3 position-relative">
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                zIndex: '2',
                position: 'absolute',
                right: 0,
                top: -8
            }}>
                <span className="badge rounded-pill bg-danger">{note.tag}</span>
            </div>
            <div className="card note bg-light">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text" style={{ height: '3.3rem' }}>{note.description}</p>
                    <div className="d-flex gap-3">
                        <i className="ms-auto fa-solid fa-pen-to-square" role="button" onClick={() => { updateNote(note) }}></i>
                        <i className="fa-solid fa-trash-can" role="button" onClick={() => { context.deleteNote(note._id) }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
