import React, { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios'
const PrivateRoute = ({ children, redirect }) => {

    const token = window.localStorage.getItem('token')
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify', {headers: {
            Authorization: `Bearer ${token}`
        }}).then(res => {
            console.log(res.data.message)
            setMessage(res.data.message)
        })
    }, [])

    return(
        <div>
            {message
            ? message === 'El usuario está logueado.' ? children : <Redirect to={redirect}/>
            : null}
        </div>
    )
}

export default PrivateRoute