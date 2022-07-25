import React, { useState, useEffect  }from 'react'
import Rating from '@mui/material/Rating';
import axios from 'axios'
import { API_URL } from '../../../config/enviroment';
import './Review.css'

function Review({user_id, trip_id, driver_id, actualRating, actualComment}) { //actualRating y actualComment me traen el rating y comentario actual de la reseña
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    useEffect(() => {
      //ACLARACION: Pregunto si son undefined ya que si el usuario no reseño el viaje entonces actualRating y actualComment son undefined
      if(actualRating !== undefined) setRating(actualRating)
      if(actualComment !== undefined) setComment(actualComment) 
      //Si actualRating no es undefined entonces muestro el rating que el usuario puso anteriormente
      //Si actualComment no es undefined entonces muestro el rating que el usuario puso anteriormente
    }, [])

    const handleSubmit = async () => {
      try {
        if(actualRating !== undefined){ //si la review existe entonces la actualizo, sino, la creo
          await axios.put(`${API_URL}/trip/review`, {user_id, trip_id, review: {rating: rating, comment: comment}})
        } else{
          await axios.post(`${API_URL}/trip/review`, {user_id, trip_id, review: {rating: rating, comment: comment}})
        }
        await axios.put(`${API_URL}/trip/generalReview`, {trip_id}) 
        await axios.put(`${API_URL}/trip/review/driver`, {driver_id})
        //generalReview: actualiza el rating del viaje considerando todas las reviews sumadas a ese viaje hasta el momento
      } catch (e) {
        console.log(e)
      }
    }

  return ( //En este div tengo Rating (componete de Mui) que muestra las estrellitas, el input que es donde pongo el comentario y un boton para submitear la reseña
    <div id='mainDiv' style={{position: 'relative', bottom: '8px'}}>
      <Rating
      value={rating}
      onChange={(e, newRating) => setRating(newRating)}
      />
      <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
      <button onClick={handleSubmit}>Publicar reseña</button>
    </div>
  )
}

export default Review