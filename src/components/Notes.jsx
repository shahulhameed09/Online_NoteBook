import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/Notes/NoteContext'
import NoteItem from './NoteItem';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      context.getNotes();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    console.log(currentNote);
  }


  const handleAddNotes = (e) => {
    e.preventDefault();
    context.editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <button hidden type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action='#' method='post' className='my-3'>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" id='etitle' name='etitle' value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input type="text" className="form-control" id='edescription' name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tag</label>
                  <input type="text" className="form-control" id='etag' name='etag' value={note.etag} onChange={onChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.edescription.length < 5 || note.etitle.length < 5} type="submit" className="btn btn-primary" onClick={handleAddNotes}>Update Note</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <h1 className='text-center my-4'>Your Notes:</h1>
      <div className="row">
        {context.notes.length === 0 ? 'No Notes to display' : context.notes.toReversed().map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} showAlerts={props.showAlerts} />
          )
        })}
      </div>
    </div>
  )
}

export default Notes
