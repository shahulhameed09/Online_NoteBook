import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Notes from './components/Notes';
import React from 'react';
import NoteStates from './context/Notes/NoteState';
import Navbar from './components/navbar';
import Login from './components/Login';
import Regs from './components/Regs';
import Footer from './components/Footer';


function App() {

  return (
    <BrowserRouter>
      <NoteStates>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact index element={<Home />} />
            <Route exact path="/notes" element={<Notes />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/regs" element={<Regs />} />
          </Routes>
        </div>
        <Footer/>
      </NoteStates>
    </BrowserRouter>
  );
}

export default App;
