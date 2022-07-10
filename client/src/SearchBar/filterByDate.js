import React, { useEffect } from "react";
import Calendar from 'react-calendar';
import './CalendarStyles/calend.css';
import { useDispatch, useSelector } from "react-redux";
import { getTrips } from "../redux/actions/getTrips";
import sumarDias, { Ascensora } from "./AuxiliarJS/orderDates";

export default function Fecha() {

    let trips = useSelector(state => state.trips)
    const dispatch = useDispatch()

    function a() {
        if (trips.length == 0) dispatch(getTrips())
    }

    useEffect(() => { a() })

    let prev
    let away
    if (trips.length) {
        let startDates = []
        trips.filter(trip => startDates.push(trip.start_date))

        const mostPreviousDate = Ascensora(startDates, false, true)
        const mostAwayDate = Ascensora(startDates, false, false, true)
        prev = sumarDias(mostPreviousDate, 1)
        away = sumarDias(mostAwayDate, 1)
    }

    const [value, onChange] = React.useState(new Date());

    function find() {
        let found = trips.filter((trip) => new Date(trip.start_date).toDateString() === value.toDateString())
        if (!found.length) {
            console.log("Lo sentimos, ningún viaje para la fecha", value.toDateString().slice(4))
        }
        else console.log(found)
    }

    return (
        <div>
            <Calendar onChange={onChange} value={value} minDate={new Date(prev)} maxDate={new Date(away)} />
            {value && <>Viajes con salida el día</>} {value && value.toLocaleDateString()}
            <button onClick={find}>Buscar</button>
        </div >
    )
}