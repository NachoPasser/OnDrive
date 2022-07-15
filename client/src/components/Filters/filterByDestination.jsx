import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
export default function FilterByDestination({ style, filters, setFilters }) {
    const [destinations, setDestinations] = useState([])
    const [selected, setSelected] = useState('Destino')
    const fixedTrips = useSelector(state => state.fixedTrips)
    const trips = useSelector(state => state.trips)

    const handleSelectDestination = (e) => {
        setSelected(e.target.value) //cambio el valor del select
    }

    useEffect(() => {
        let destinationsArray = []
        for (const element of fixedTrips) {
            if (!destinationsArray.includes(element.destination)) {
                destinationsArray.push(element.destination)
            }
        }
        setDestinations(destinationsArray)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trips])

    useEffect(() => {
        setFilters({
            ...filters,
            filterDest: selected
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    return (
        <div>
            <select className={style} onChange={handleSelectDestination} value={selected}>
                <option value="Destino">Destino</option>
                {destinations.length > 0 && destinations.map(destination =>
                    <option key={destination} value={destination}>
                        {destination}
                    </option>)}

            </select>
        </div>
    )
}
