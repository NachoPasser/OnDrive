import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTripsByCapacity } from '../../redux/actions/getTripsByCapacity'
import { getFilteredTrips } from '../../redux/actions/getFilteredTrips'
import a from '../../assets/Home/A 1.png'
import b from '../../assets/Home/b 1.png'
import c from '../../assets/Home/c 1.png'
import d from '../../assets/Home/d 1.png'
import e from '../../assets/Home/e 1.png'

export default function FilterByCapacity({ style}) {
    let dispatch = useDispatch()
    const filters = useSelector(state => state.filters)
    const capacities = 
    [{img: a, paxs: '1 - 2 paxs'}, //reemplazo - por espacio y despues spliteo
     {img: b, paxs: '2 - 4 paxs'}, //si el array es de length 1 es +8 sino es uno de los anteriores casos
     {img: c, paxs: '4 - 6 paxs'}, 
     {img: d, paxs: '5 - 8 paxs'}, 
     {img: e, paxs: '  8+  paxs'}]

    const handleSelectCapacity= (e) => {
        let payload = {...filters, capacity: e.target.value}
        dispatch(getFilteredTrips(payload))
    }

    return (
        <div className={style.capacity}>
            {capacities.map(c => 
                <div name={c.paxs} className={style.carDiv} onClick={handleSelectCapacity}>
                    <img className={style.carImg} src={c.img} alt="" />
                    <div className={style.carFooter}>
                        <h4 className={style.paxs}>{c.paxs}</h4>
                    </div>
                </div>
            )}
        </div>
    )
}
