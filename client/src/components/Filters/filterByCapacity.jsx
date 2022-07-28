import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTripsByCapacity } from '../../redux/actions/getTripsByCapacity'
import { getFilteredTrips } from '../../redux/actions/getFilteredTrips'

export default function FilterByCapacity({ style}) {
    let dispatch = useDispatch()
    const [capacity, setCapacity] = useState([])
    const [selected, setSelected] = useState('Destino')
    const fixedTrips = useSelector(state => state.fixedTrips)
    const trips = useSelector(state => state.trips)
    const filters = useSelector(state => state.filters)

    const handleSelectCapacity= (e) => {
        setSelected(e.target.value) //cambio el valor del select
        // if(e.target.value !== 'Capacidad'){
            let payload = {...filters, capacity: e.target.value}
            dispatch(getFilteredTrips(payload))
        // } else{
        //     dispatch(getFilteredTrips({...filters, capacity: false}))
        // }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trips])

    return (
        <div>
            <select className={style} onChange={handleSelectCapacity} value={selected}>
                <option value="Capacidad">Capacidad</option>
                {capacity.length > 0 && capacity.map(capacity =>
                    <option key={capacity} value={capacity}>
                        {capacity}
                    </option>)}

            </select>
        </div>
    )
}
