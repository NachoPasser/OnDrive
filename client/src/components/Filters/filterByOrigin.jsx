import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
export default function FilterByOrigin({ style, filters, setFilters }) {

    const [origins, setOrigins] = useState([])
    const [selected, setSelected] = useState('Origen')
    const fixedTrips = useSelector(state => state.fixedTrips)
    const trips = useSelector(state => state.trips)

    const handleSelectOrigin = (e) => {
        setSelected(e.target.value) //cambio el valor del select
    }

    useEffect(() => {
        let originsArray = []
        for (const element of fixedTrips) {
            if (!originsArray.includes(element.origin)) {
                originsArray.push(element.origin)
            }
        }
        setOrigins(originsArray)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trips])

    useEffect(() => {
        setFilters({
            ...filters,
            filterOrg: selected
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])


    return (
        <div>
            <select className={style} onChange={handleSelectOrigin} value={selected}>
                <option value="Origen">Origen</option>
                {origins.length > 0 && origins.map(origin =>
                    <option key={origin} value={origin}>
                        {origin}
                    </option>)}
            </select>
        </div>
    )
}
