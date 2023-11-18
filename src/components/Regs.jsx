import React, { useContext, useState } from 'react';
import NoteContext from '../context/Notes/NoteContext';
import { Link, useNavigate } from "react-router-dom";

const Regs = () => {

    const context = useContext(NoteContext)
    let navigate = useNavigate();
    const [data, setData] = useState({ username: '', email: '', password: '', password2: '' });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handelRegs = async (e) => {
        e.preventDefault();
        if (data.password !== data.password2) {
            context.showAlerts('Passwords do not match', "danger")
        } else {
            const datas = await context.regUser(data.username, data.email, data.password)

            if (datas.success) {
                navigate("/login");
                context.showAlerts("Successfully Registered", "success");

            } else {
                context.showAlerts(datas.error, "danger");

            }
        }
    }

    return (
        <div className='card w-50 p-4 pb-1 note bg-info' style={{margin:'auto', marginTop:'2rem'}}>
            <h1 className='mt-3 text-center'>Register</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <input type="text" placeholder='Username' className="form-control" id='username' name='username' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <input type="email" placeholder='Email ID' className="form-control" id='email' name='email' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Password' className="form-control" id='password' name='password' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Confirm Password' className="form-control" id='password' name='password2' onChange={onChange} />
                </div>
                <button className="btn btn-dark w-100 my-3" onClick={handelRegs} ><b>Submit</b></button>
                <p>Already have an account? <Link to='/login'>Sign In</Link></p>
            </form>
        </div>
    )
}

export default Regs
