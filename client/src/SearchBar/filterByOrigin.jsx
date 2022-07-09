import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTripsByOrigin } from '../redux/actions/getTripsByOrigin.js'
import { getTrips } from '../redux/actions/getTrips.js'
import { useEffect } from 'react'
export default function FilterByOrigin({style}) {
    let dispatch = useDispatch()
    const [origins, setOrigins] = useState([])
    const [selected, setSelected] = useState('Origen')
    const fixedTrips = useSelector(state => state.fixedTrips)
    const trips = useSelector(state => state.trips)

    const handleSelectOrigin= (e) => {
        setSelected(e.target.value) //cambio el valor del select
        if(e.target.value !== 'Origen'){
            dispatch(getTripsByOrigin(e.target.value))
        } else{
            dispatch(getTrips())
        }
    }

    useEffect(() => {
       let originsArray = []
       for (const element of fixedTrips) {
            if(!originsArray.includes(element.origin)){
                originsArray.push(element.origin)
            }
       }
       setOrigins(originsArray)
    }, [trips])
    
    return (
        <div>
            <select className={style} onChange={handleSelectOrigin} value={selected}>
                <option value="Origen">Origen</option>
                {origins.length > 0 && origins.map(origin => 
                <option value={origin}>
                {origin}
                </option>)}
            </select>
        </div>
    )
}
