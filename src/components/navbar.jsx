import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import Alert from '../components/Alert'

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const logouts = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className='fixed-top'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand">OnlineNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? 'active' : ''}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/notes" ? 'active' : ''}`} to="/notes">Notes</Link>
              </li>
            </ul>
            <form className="d-flex">
              {localStorage.getItem('token')?
                <button type="button" onClick={logouts} className="btn btn-info btn-sm me-2">Logout</button>
                :
                <Link to='/login' className="btn btn-info btn-sm me-2" >Login</Link>
              }
            </form>
          </div>
        </div>
      </nav>
      <Alert />
    </div>
  )
}

export default Navbar