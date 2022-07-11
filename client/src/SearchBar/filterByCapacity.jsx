import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTripsByCapacity } from '../redux/actions/getTripsByCapacity'

export default function FilterByCapacity({ style, filters, setFilters }) {
    let dispatch = useDispatch()
    const [capacity, setCapacity] = useState([])
    const [selected, setSelected] = useState('Destino')
    const fixedTrips = useSelector(state => state.fixedTrips)
    const trips = useSelector(state => state.trips)

    const handleSelectCapacity= (e) => {
        setSelected(e.target.value) //cambio el valor del select
        if(e.target.value !== 'Capacidad'){
            dispatch(getTripsByCapacity(e.target.value))
        }
    }

    useEffect(() => {
        let capacityArray = []
        for (const element of fixedTrips) {
            if (!capacityArray.includes(element.capacity)) {
                capacityArray.push(element.capacity)
            }
        }
        capacityArray = capacityArray.sort()
        setCapacity(capacityArray)

    }, [trips])

    return (
        <div>
            <select className={style} onChange={handleSelectCapacity} value={selected}>
                <option value="Capacidad">Capacidad</option>
                {capacity.length > 0 && capacity.map(destination =>
                    <option value={destination}>
                        {destination}
                    </option>)}

            </select>
        </div>
    )
}
