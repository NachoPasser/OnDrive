import React, {useState} from 'react'
import axios from 'axios';
import s from './User.module.css';
import {API_URL} from '../../../config/enviroment';
export default function User({email, ban_status}) {
  const [banned, setBan] = useState(ban_status)

  const handleBan = () => {
    setBan(true)
    axios.put(`${API_URL}/admin/ban`, {ban_email: email})
    .then(res => alert(res.data.msg))
  }

  const handleUnban = () => {
    setBan(false)
    axios.put(`${API_URL}/admin/unban`, {unban_email: email})
    .then(res => alert(res.data.msg))
  }

  return (
    <div style={{position: 'relative'}}>
    <div className={s.columns}>
      <span id={s.email}>{email}</span>
      {!banned ? <span id={s.not_ban}>Activo</span> : <span id={s.ban}>Baneado</span>}
    </div>
    <div id={s.divBtn}>
      {!banned 
      ? <button className={s.btn} onClick={handleBan}>BANEAR</button> 
      : <button className={s.btn} onClick={handleUnban}>DESBANEAR</button>}
    </div>
    </div>
  )
}

