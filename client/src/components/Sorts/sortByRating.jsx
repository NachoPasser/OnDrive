import React from 'react'
import { useDispatch } from 'react-redux'
import { sortTripsByDestination } from '../../redux/actions/sortTripsByRating.js'
export default function SortByRating({ style, sorters, setSorters}) {
    let dispatch = useDispatch()
    const handleSelectOrder= (e) => {
        setSorters({
            sortRating: e.target.value,
            sortAlphabetically: ''
        }) //cambio el valor del select
                
        if(e.target.value !== 'Orden') dispatch(sortTripsByDestination(e.target.value))
       
    }
    return (
        <div>
            <select className={style} onChange={handleSelectOrder} value={sorters.sortRating}>
                <option value="Orden">Calificación</option>
                <option value="ASC">Peores conductores</option>
                <option value="DSC">Mejores conductores</option>
            </select>
        </div>
    )
}
