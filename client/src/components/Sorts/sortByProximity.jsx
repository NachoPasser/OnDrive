import React from 'react'
import { useDispatch } from 'react-redux'
import { getSortedProximityTrips } from '../../redux/actions/getSortedProximityTrips.js'
export default function SortProximity({style, sorters, setSorters}) {
    let dispatch = useDispatch()
    const handleSelectOrder= (e) => {
        setSorters({
            rating: '',
            proximity: e.target.value
        }) //cambio el valor del select
                
        if(e.target.value !== 'Orden') dispatch(getSortedProximityTrips(e.target.value))
       
    }

    return (
        <div>
            <select className={style.inputSortProximity} onChange={handleSelectOrder} value={sorters.proximity}>
                <option disabled={sorters.proximity !== '' ? true : false} value="Orden">Fecha de salida</option>
                <option value="ASC">Mas proximos</option>
                <option value="DSC">Mas lejanos</option>
            </select>
        </div>
    )
}
