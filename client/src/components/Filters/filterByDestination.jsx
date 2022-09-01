import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
export default function FilterByDestination({ style, filters, setFilters }) {

    const [destination, setDestination] = useState('')

    const handleOrigin = (e) => {
        e.preventDefault()
        setDestination(e.target.value)
    }

    useEffect(() => {
        setFilters({
            ...filters,
            filterDest: destination
        })
    }, [destination])

    return (
        <div>
            <input
                id={style}
                onChange={e => handleOrigin(e)}
                type='search'
                placeholder='Ingrese un destino...'
                value={destination}
            />
        </div>
    )
}
