import React, { useContext, useState } from 'react';
import NoteContext from '../context/Notes/NoteContext'

const Home = (props) => {

  let context = useContext(NoteContext);

  const [note, setNote] = useState({title:'', description:'', tag:''});

  const handleAddNotes = (e) => {
    e.preventDefault();
    context.addNotes(note.title, note.description, note.tag);
    context.showAlerts("Your note is saved in cloud", "success");
    setNote({title:'', description:'', tag:''});
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <div className='card w-75 p-4 note bg-info m-auto mt-5'>
        <h1 className='mt-3 text-center'>Add Note</h1>
        <form action='#' method='post' className='my-3'>
          <div className="mb-3">
            <input type="text" placeholder='Enter Title' className="form-control" id='title' value={note.title} name='title' onChange={onChange} />
          </div>
          <div className="mb-3">
            <input type="text" placeholder='Enter Description' className="form-control" id='description' value={note.description} name='description' onChange={onChange} />
          </div>
          <div className="mb-3">
            <input type="text" placeholder='Enter Tag' className="form-control" id='tag' value={note.tag} name='tag' onChange={onChange} />
          </div>
          <button disabled={note.description.length<5 || note.title.length<5} className="btn btn-dark w-100 mt-3" onClick={handleAddNotes} ><b>Submit</b></button>
        </form>
      </div>
    </>
  )
}

export default Home
