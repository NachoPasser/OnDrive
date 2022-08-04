import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
export default function FilterByOrigin({ style, filters, setFilters }) {

    const [origin, setOrigin] = useState('')

    const handleOrigin = (e) => {
        e.preventDefault()
        setOrigin(e.target.value)
    }

    useEffect(() => {
        setFilters({
            ...filters,
            filterOrg: origin
        })
    }, [origin])

    return (
        <div>
            <input
                id={style}
                onChange={e => handleOrigin(e)}
                type='search'
                placeholder='Ingrese un origen...'
                value={origin}
            />
        </div>
    )
}