import React, { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import { API_URL } from "../../../config/enviroment";
const PrivateRouteForLogged = ({ children, redirect }) => {

    const token = window.localStorage.getItem('token')
    const [message, setMessage] = useState('')
    console.log(token)
    useEffect(() => {
        axios.get(`${API_URL}/auth/verify`, {headers: {
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
            ? message === 'El usuario está logueado.' ? <Redirect to={redirect}/> : children
            : null}
        </div>
    )
}

export default PrivateRouteForLogged