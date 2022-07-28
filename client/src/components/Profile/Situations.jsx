import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Review from '../Sections/Review/Review'
import axios from 'axios'
import { API_URL } from '../../config/enviroment'
import style from "./Situations.module.css";
function returnPurchase(user_id, trip_id){
    axios.delete(`${API_URL}/trip/restore-trip`, {headers: {
        user_id,
        trip_id
    }})
}   
function Situations({user_id, trip_id, driver_id, actualRating,  actualComment, start_date, finish_date}) {
    const [actualDate, setActualDate] = useState(new Date(Date.now()))
    const [startDate, setStartDate] = useState(new Date(start_date))
    const [finishDate, setfinishDate] = useState(new Date(finish_date))
    const [updated, setUpdated] = useState(false)
    useEffect(() => {
        startDate.setTime(startDate.getTime() + 3 * 60 * 60 * 1000);
        finishDate.setTime(finishDate.getTime() + 3 * 60 * 60 * 1000)
        setUpdated(true)
        // console.log('ACTUAL:', actualDate)
        // console.log('INICIO:',startDate)
        // console.log('FINAL:',finishDate)
    }, [])
    
  return (
    <div>
        {
            updated ?
            actualDate.getTime() < startDate.getTime() 
            ?  <button className={style.cancel} onClick={() => returnPurchase(user_id, trip_id)}>CANCELAR</button>
            : actualDate.getTime() < finishDate.getTime()
            ? <span className={style.travelling}>Viajando...</span>
            : <div className={style.review}>
                <Review 
                user_id={user_id}
                trip_id={trip_id}
                driver_id={driver_id}
                actualRating={actualRating}
                actualComment={actualComment}
                />
                </div>
            : null
        }
    </div>
  )
}

export default Situations