import React, { useEffect } from 'react'
import axios from 'axios'
import { getUsersFromDatabase } from '../../redux/actions/getUsersFromDatabase'
import { useDispatch, useSelector } from 'react-redux'

export default function AdminPanel() {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('que mierda pasa?')
        dispatch(getUsersFromDatabase())
    }, [])
    
  return (
    <div>
        <ul>
        {
            users.length
            ?  users.map(u => 
            <li style={{color: 'white'}}>
                {u.id},
                {u.email}
            </li> )
            : <h1>No hay usuarios cargados.</h1>
        }
        <button>Banear</button>
        <button>Desbanear</button>
        </ul>
    </div>
  )
}
