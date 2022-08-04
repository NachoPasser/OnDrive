import React, { useEffect } from "react";
import Calendar from 'react-calendar';
import './CalendarStyles/calend.css';
import { useDispatch, useSelector } from "react-redux";
import sumarDias, { Ascensora } from "./AuxiliarJS/orderDates";
import { getTrips } from "../../redux/actions/getTrips";
import { getFilteredTrips } from "../../redux/actions/getFilteredTrips";
import calendar from '../../assets/Home/calendar.png'

export default function Fecha({style}) {
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
    const [inputValue, setInputValue] = React.useState('dd/mm/yyyy')

    return (
        <div id={style.wtf}>
            <div id={style.calendar}>
            <Calendar onChange={onChange} value={value} minDate={new Date(prev)} maxDate={new Date(away)} />
            </div>
            <div id={style.handleDate}>
            <button id={style.deleteDate} onClick={() => {
                setInputValue('dd/mm/yyyy')
                dispatch(getFilteredTrips({...filters, date: 'Fecha'}))
            }}>Quitar fecha</button>
            <button id={style.searchDate} onClick={() => {
                let payload = {...filters, date: value}
                setInputValue(value.toLocaleDateString())
                dispatch(getFilteredTrips(payload))
            }}>Buscar fecha</button>
            </div>
            <div id={style.filterDate}>
                <img id={style.calendarImg}src={calendar} alt="" />
                <input id={style.inputFilterDate} type="text" placeholder="dd/mm/yyyy" value={inputValue}/>
            </div>
        </div >
    )
}