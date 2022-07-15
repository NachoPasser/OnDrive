import React from 'react'
import { useDispatch } from 'react-redux'
import { sortTripsAlphabetically } from '../../redux/actions/sortTripsAlphabetically.js'
export default function SortAlphabetically({style, sorters, setSorters}) {
    let dispatch = useDispatch()
    const handleSelectOrder= (e) => {
        setSorters({
            sortRating: '',
            sortAlphabetically: e.target.value
        }) //cambio el valor del select
                
        if(e.target.value !== 'Orden') dispatch(sortTripsAlphabetically(e.target.value))
       
    }

    return (
        <div>
            <select className={style} onChange={handleSelectOrder} value={sorters.sortAlphabetically}>
                <option value="Orden">Destinos - alfabetico</option>
                <option value="ASC">A - Z</option>
                <option value="DSC">Z - A</option>
            </select>
        </div>
    )
}
