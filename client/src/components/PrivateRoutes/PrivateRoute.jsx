import React, { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import { API_URL } from "../../config/enviroment";

const PrivateRoute = ({ admin, visitor, pageUser, googleUser, children, redirect }) => {

    const token = window.localStorage.getItem('token')
    const [analized, setAnalized] = useState(false)
    const [message, setMessage] = useState({
        admin: '',
        visitor: '',
        pageUser: '',
        googleUser: '',
    })
    
    useEffect(() => {
        let message = {
            admin: '',
            visitor: '',
            pageUser: '',
            googleUser: '',
        }
        let a, b, c, d= ''
    
            if(admin){
                a = axios.get(`${API_URL}/auth/verify`, {headers: { 
                    Authorization: `Bearer ${token}`,
                    case: 'admin'
                }}).then(res => {
                     message.admin= res.data.message //The user is allowed.
                }).catch((res) => 'No es un admin')
            } //solo pasa si el usuario tiene token valido y no tiene definida una contraseña.

            if(visitor){
                b = axios.get(`${API_URL}/auth/verify`, {headers: {
                    Authorization: `Bearer ${token}`,
                    case: 'visitor'
                }}).then(res => {
                    'No es un visitante'
                }).catch(() => {
                    message.visitor = 'The user is allowed.'
                })
            }//solo pasa si el usuario no tiene token o este es invalido.

            if(pageUser){
                c = axios.get(`${API_URL}/auth/verify`, {headers: {
                    Authorization: `Bearer ${token}`,
                    case: 'pageUser'
                }}).then(res => {
                    message.pageUser = res.data.message
                }).catch((res) => 'No es un usuario de pagina')
            } //solo pasa si el usuario tiene token valido.
    
            if(googleUser){
                d = axios.get(`${API_URL}/auth/verify`, {headers: {
                    Authorization: `Bearer ${token}`,
                    case: 'googleUser'
                }}).then(res => {
                    message.googleUser = res.data.message
                }).catch((res) => 'No es un usuario de google')
            } //solo pasa si el usuario tiene un token valido y no tiene contraseña definida.
            
        Promise.allSettled([a, b, c, d]).then(() => {
            setMessage(message)
            setAnalized(true)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {
            setMessage({});
          };
    }, [])

    return(
        <div>
            {analized
            ? Object.values(message).includes('The user is allowed.') 
                ? children
                : <Redirect to={redirect}></Redirect>
            :null
            }
        </div>
    )
}

export default PrivateRoute