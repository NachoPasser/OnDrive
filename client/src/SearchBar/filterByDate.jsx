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

    useEffect( () => {
        if (!trips.length) {
            dispatch(getTrips())
        }
    }, [])

    // console.log(trips)
    //CANCELADO
    // function genTrip(driver) {
    //     const dia = Math.floor(Math.random() * (30 - 5 + 1) + 4);
    //     const mes = Math.floor(Math.random() * 10) + 1;
    //     return [{
    //         start_date: new Date(2022, mes, dia - 2),
    //         finish_date: new Date(2022, mes, dia),
    //         capacity: Math.floor(Math.random() * (3 - 5 + 1) + 3),
    //         rating: Math.floor(Math.random() * 5),
    //         price: Math.floor(Math.random() * 1000),
    //         origin: "ROS",
    //         destination: "SFE",
    //         marca: "AUDI",
    //         driver,
    //     }, {
    //         start_date: new Date(2022, mes, dia - 2),
    //         finish_date: new Date(2022, mes, dia),
    //         capacity: Math.floor(Math.random() * (3 - 5 + 1) + 3),
    //         rating: Math.floor(Math.random() * 5),
    //         price: Math.floor(Math.random() * 1000),
    //         origin: "BS AS",
    //         destination: "FSA",
    //         marca: "NISSAN",
    //         driver,
    //     }]
    // }
    // const trips = genTrip("Toretto")

    //HARDCODE#1 === CANCELLED RETURN trips AGAIN

    // const t = [{ "start_date": new Date("2022-09-10"), "finish_date": new Date("2022-09-12"), "capacity": 2, "rating": 1, "price": 5, "origin": "La Plata", "destination": "Santiago del Estero", "marca": "Renault", "driver": { "name": "Santino", "lastname": "Lozano", "age": 22, "license": 94601, "email": "santino.lozano@gmail.com", "phone": 9913645013, "password": 353438, "role": null, "car": [{ "color": "#40159C", "license_plate": " as09EC6o", "year": 2017 }] } },
    // { "start_date": new Date("2022-09-15"), "finish_date": new Date("2022-09-16"), "capacity": 2, "rating": 1, "price": 5, "origin": "La Plata", "destination": "Santiago del Estero", "marca": "Renault", "driver": { "name": "Santino", "lastname": "Lozano", "age": 22, "license": 94601, "email": "santino.lozano@gmail.com", "phone": 9913645013, "password": 353438, "role": null, "car": [{ "color": "#40159C", "license_plate": " as09EC6o", "year": 2017 }] } }
    // ]
    // A los del Front: 
    // Perdón por el código comentado en medio del componente (.-.)

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

    function find() {
        dispatch(getTripsByDate(value))
    }

    return (
        <div>
            <Calendar onChange={onChange} value={value} minDate={new Date(prev)} maxDate={new Date(away)} />
            {value && <>Viajes con salida el día</>} {value && value.toLocaleDateString()}
            <button onClick={find}>Buscar</button>
        </div >
    )
}