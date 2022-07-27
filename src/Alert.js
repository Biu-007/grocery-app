import React, { useEffect } from 'react'

const Alert = ({ alert, removeAlert, list }) => {
    const { alertType, alertMessage } = alert
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 3000);
        return () => clearTimeout(timeout)
    }, [list])
    return (
        <div className={`alert alert-${alertType}`} >
            <h4>{alertMessage}</h4>
        </div>
    )
}

export default Alert
