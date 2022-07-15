import React, { useEffect } from 'react'
import s from './AdminPanel.module.css'
import User from '../Sections/User/User'
import { getUsersFromDatabase } from '../../redux/actions/getUsersFromDatabase'
import { useDispatch, useSelector } from 'react-redux'

export default function AdminPanel() {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsersFromDatabase())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div>
        <div id={s.columns}>
            <h1>Direccion email</h1>
            <h1>Status</h1>
        </div>
        <div>
        {users.length
        ?  users.map(u => 
            <User
            key={u.id}
            email={u.email}
            ban_status={u.ban_status}
            />)
        : <h1 style={{color: 'white'}}>No hay usuarios cargados.</h1>
        }
        </div>
    </div>
  )
}