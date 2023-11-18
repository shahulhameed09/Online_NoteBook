import React, { useContext, useState } from 'react'
import NoteContext from '../context/Notes/NoteContext';
import { Link, useNavigate  } from "react-router-dom";

const Login = () => {
    const context = useContext(NoteContext)
    let navigate = useNavigate();

    const [data, setData] = useState({ email: '', password: '' });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handelLogin = async (e) => {

        e.preventDefault();
        const datas = await context.loginUser(data.email, data.password)

        if (datas.success) {
            localStorage.setItem('token', datas.authtoken)
            localStorage.setItem('name',datas.username)
            context.showAlerts("Successfully Logged in", "success");
            navigate("/");
      
          } else {
            context.showAlerts(datas.error, "danger");
      
          }
    }

    return (
        <div className='card w-50 p-4 pb-1 note bg-info' style={{margin:'auto', marginTop:'4rem'}}>
            <h1 className='mt-3 text-center'>Login</h1>
            <form action='#' method='post' className='my-3'>

                <div className="mb-3">
                    <input type="email" placeholder='Email ID' className="form-control" id='email' name='email' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Password' className="form-control" id='password' name='password' onChange={onChange} />
                </div>
                <button className="btn btn-dark w-100 my-3" onClick={handelLogin} ><b>Submit</b></button>
                <p>Don't have an account? <Link to='/regs'>Sign Up</Link></p>
            </form>
        </div>
    )
}

export default Login
