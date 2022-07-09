import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fecha from "./filterByDate";

//faltan las funciones de las actions y los estados globales


export default function SearchBar({style}) {

    //dispatch
    //const dispatch = useDispatch()

    //estados locales
    const [travels, setTravels] = useState('')
    const [loader, setLoader] = useState(false)
    const [calendar, setCalendar] = useState(false)

    //estados globales (falta armar redux)
    // const search = useSelector((state) => state.search)

    //ciclo de vida
    useEffect(() => {
        setLoader(false)
    }, [])

    //handlers
    function handleInputChange(e) {
        e.preventDefault()
        setTravels(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoader(true)
        // dispatch(/*accion para limpiar el search*/)
        // dispatch(/*accion buscadora*/(travels))
    }

    function renderCalendar() {
        if (!calendar) setCalendar(true)
        else setCalendar(false)
    }

    return (
        <div className={style}>
            <div>
                <input
                    onChange={(e) => handleInputChange(e)}
                    type='search'
                    placeholder="Buscar un viaje..."
                    onKeyPress={(e => {
                        if (e.key === 'Enter') {
                            // dispatch(/*accion para limpiar el search*/)
                            // dispatch(/*accion buscadora*/(travels))
                            setLoader(true)
                        }
                    })}
                />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            </div>
            <button onClick={renderCalendar}>
                Filtrar por fecha de partida
            </button>
            {calendar && <Fecha />}
        </div>
    )
}