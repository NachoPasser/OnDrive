import React, { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import { API_URL } from "../../../config/enviroment";
const PrivateRouteForNotAdmin = ({ children, redirect }) => {

    const token = window.localStorage.getItem('token')
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        axios.get(`${API_URL}/admin/verify`, {headers: {
            Authorization: `Bearer ${token}`
        }}).then(res => {
            setMessage(res.data.message)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div>
            {message
            ? message === 'El usuario es administrador.' ? children : <Redirect to={redirect}/>
            : null}
        </div>
    )
}

export default PrivateRouteForNotAdmin