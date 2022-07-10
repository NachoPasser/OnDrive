import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrips } from '../redux/actions/getTrips.js'
import { sortTripsByDestination } from '../redux/actions/sortTripsByRating.js'
export default function SortByRating({ style }) {
    let dispatch = useDispatch()
    const [selected, setSelected] = useState('Orden')

    const handleSelectOrder = (e) => {
        setSelected(e.target.value) //cambio el valor del select
        if (e.target.value !== 'Orden') {
            dispatch(sortTripsByDestination(e.target.value))
        } else {
            dispatch(getTrips()) //me va a devolver lo mismo que el ultimo orden ingresado
            //ya que trips depende de fixedTrips actualmente
        }
    }

    return (
        <div>
            <select className={style} onChange={handleSelectOrder} value={selected}>
                <option value="Orden">Rating</option>
                <option value="ASC">mejores conductores</option>
                <option value="DSC">peores conductores</option>
            </select>
        </div>
    )
}
