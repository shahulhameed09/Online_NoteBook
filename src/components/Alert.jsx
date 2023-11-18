import React, { useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext';


const Alert = () => {
    const context = useContext(NoteContext)
    const types = context.alerts && context.alerts.type.charAt(0).toUpperCase() + context.alerts.type.slice(1);
    return (
        <div style={{height:'50px'}}>
            {context.alerts && <div className={`alert alert-${context.alerts.type} alert-dismissible p-2 fade show`} role="alert">
                <strong> {types}:</strong> {context.alerts.message}!
            </div>}
        </div>
    )
}

export default Alert
