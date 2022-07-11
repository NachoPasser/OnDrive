import React, { useEffect } from "react";
import Calendar from 'react-calendar';
import './CalendarStyles/calend.css';
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../redux/actions/getTrips";
import sumarDias, { Ascensora } from "./AuxiliarJS/orderDates";
import { getTripsByDate } from "../redux/actions/getTripsByDate";

export default function Fecha() {

    let trips = useSelector(state => state.trips)
    let fixedTrips = useSelector(state => state.fixedTrips)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!trips.length) {
            dispatch(getTrips())
        }
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
            <div id="divBuscar">
                {value && <>Viajes con salida el día</>} {value && value.toLocaleDateString()}
                <button id="btnBuscar" onClick={() => dispatch(getTripsByDate(value))}>Buscar</button>
            </div>
        </div >
    )
}