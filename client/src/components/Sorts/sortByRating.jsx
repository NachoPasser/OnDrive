import React from 'react'
import { useDispatch } from 'react-redux'
import { getSortedRatingTrips } from '../../redux/actions/getSortedRatingTrips.js'
export default function SortByRating({ style, sorters, setSorters}) {
    let dispatch = useDispatch()
    const handleClick= (e) => {
        
        setSorters({
            rating: 'Presionado!',
            proximity: ''
        }) //cambio el valor del sort
        let payload = {...sorters, rating: 'Presionado!'}
        dispatch(getSortedRatingTrips(payload))
       
    }
    return (
        <div>
            <button className={sorters.rating === 'Presionado!' ? style.btnRatingPressed : style.btnRating} onClick={handleClick}>Mejor calificación</button>
        </div>
    )
}
