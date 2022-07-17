import React, { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import { API_URL } from "../../../config/enviroment";
const PrivateRouteForNotLogged = ({ children, redirect }) => {

    const token = window.localStorage.getItem('token')
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        axios.get(`${API_URL}/auth/verifyLogin`, {headers: {
            Authorization: `Bearer ${token}`
        }}).then(res => {
            console.log(res.data.message)
            setMessage(res.data.message)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div>
            {message
            ? message === 'The user logged in' ? children : <Redirect to={redirect}/>
            : null}
        </div>
    )
}

export default PrivateRouteForNotLogged