import React, { useState } from "react";
import NoteContexts from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';

  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial);

  //fetch notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      }
    );
    const json = await response.json();
    setnotes(json);
  }

  // Add Notes
  const addNotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
    const json = await response.json();
    // Frontend update
    setnotes(notes.concat(json))

  }

  //Delete Notes
  const deleteNote = async (ID) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${ID}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      }
    );
    const json = await response.json();
    console.log(json);

    // Frontend update
    const newNote = notes.filter((note) => { return note._id !== ID });
    setnotes(newNote);
    showAlerts("Your note is Deleted from cloud", "danger");

  }

  //Edit Notes
  const editNote = async (ID, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${ID}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
    const json = await response.json();
    console.log(json);

    // Frontend update
    let newNote = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === ID) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setnotes(newNote);
    showAlerts("Your note is Edited on cloud", "success");

  }

  // Register user
  const regUser = async (username, email, password) => {

    //API call
    const response = await fetch(`${host}/api/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
      });
    const json = await response.json();
    console.log(json);
    return json;
  }

  //Login user
  const loginUser = async (email, password) => {

    //API call
    const response = await fetch(`${host}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
    const json = await response.json();
    console.log(json);
    return json;


  }

  //Alert messages

  const [alerts, setAlerts] = useState(null);

  const showAlerts = (message, type) => {
    setAlerts({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlerts(null)
    }, 2500);
  }


  return (
    <NoteContexts.Provider value={{ notes, addNotes, deleteNote, editNote, getNotes, alerts, showAlerts, regUser, loginUser }}>
      {props.children}
    </NoteContexts.Provider>
  )
}

export default NoteState;