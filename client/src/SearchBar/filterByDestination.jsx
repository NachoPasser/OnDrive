import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTripsByDestination } from '../redux/actions/getTripsByDestination.js'
import { getTrips } from '../redux/actions/getTrips.js'
import { useEffect } from 'react'
export default function FilterByDestination({ style }) {
    let dispatch = useDispatch()
    const [destinations, setDestinations] = useState([])
    const [selected, setSelected] = useState('Destino')
    const fixedTrips = useSelector(state => state.fixedTrips)
    const trips = useSelector(state => state.trips)

    const handleSelectDestination = (e) => {
        setSelected(e.target.value) //cambio el valor del select
        if (e.target.value !== 'Destino') {
            dispatch(getTripsByDestination(e.target.value))
        } else {
            dispatch(getTrips())
        }
    }

    useEffect(() => {
        let destinationsArray = []
        for (const element of fixedTrips) {
            if (!destinationsArray.includes(element.destination)) {
                destinationsArray.push(element.destination)
            }
        }
        setDestinations(destinationsArray)
    }, [trips])


    // const handleBtn = (e) => {
    //     console.log(trips)
    // }

    return (
        <div>
            <select className={style} onChange={handleSelectDestination} value={selected}>
                <option value="Destino">Destino</option>
                {destinations.length > 0 && destinations.map(destination =>
                    <option value={destination}>
                        {destination}
                    </option>)}

            </select>
            {/* <button className={style} onClick={handleBtn}>Obtener trips</button> */}
        </div>
    )
}
