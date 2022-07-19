import React, { useEffect } from "react";
import Calendar from 'react-calendar';
import './CalendarStyles/calend.css';
import { useDispatch, useSelector } from "react-redux";
import sumarDias, { Ascensora } from "./AuxiliarJS/orderDates";
import { getTrips } from "../../redux/actions/getTrips";
import { getFilteredTrips } from "../../redux/actions/getFilteredTrips";

export default function Fecha() {
    const filters = useSelector(state => state.filters)
    let trips = useSelector(state => state.trips)
    let fixedTrips = useSelector(state => state.fixedTrips)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!trips.length) {
            dispatch(getTrips())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let prev
    let away
    if (fixedTrips.length) {
        let startDates = []
        fixedTrips.map(trip => startDates.push(trip.start_date))

        const mostPreviousDate = Ascensora(startDates, false, true)
        const mostAwayDate = Ascensora(startDates, false, false, true)
        prev = sumarDias(mostPreviousDate, 1)
        away = sumarDias(mostAwayDate, 1)
    }

    const [value, onChange] = React.useState(new Date());

    return (
        <div>
            <Calendar onChange={onChange} value={value} minDate={new Date(prev)} maxDate={new Date(away)} />
            <button id="btnQuitar" onClick={() => dispatch(getFilteredTrips({...filters, date: 'Fecha'}))}>Quitar filtro de fecha</button>
            <div id="divBuscar">
                {value && <>Viajes con salida el día</>} {value && value.toLocaleDateString()}
                <button id="btnBuscar" onClick={() => {
                    let payload = {...filters, date: value}
                    dispatch(getFilteredTrips(payload))
                    }}>Buscar</button>
            </div>
        </div >
    )
}