import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrips } from '../redux/actions/getTrips.js'
import { sortTripsAlphabetically } from '../redux/actions/sortTripsAlphabetically.js'
export default function SortAlphabetically({style}) {
    let dispatch = useDispatch()
    const [selected, setSelected] = useState('Orden')

    const handleSelectOrder= (e) => {
        setSelected(e.target.value) //cambio el valor del select
        if(e.target.value !== 'Orden'){
            dispatch(sortTripsAlphabetically(e.target.value))
        } else{
            dispatch(getTrips()) //me va a devolver lo mismo que el ultimo orden ingresado
            //ya que trips depende de fixedTrips actualmente
        }
    }

    return (
        <div>
            <select className={style} onChange={handleSelectOrder} value={selected}>
                <option value="Orden">Alfabetico</option>
                <option value="ASC">ASC</option>
                <option value="DSC">DSC</option>
            </select>
        </div>
    )
}
