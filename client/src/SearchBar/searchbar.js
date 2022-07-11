import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearch } from "../redux/actions/getSearch";
import Fecha from "./filterByDate";

//faltan las funciones de las actions y los estados globales


export default function SearchBar({style}) {

    //dispatch
    const dispatch = useDispatch()

    //estados locales
    const [travels, setTravels] = useState('')
    const [loader, setLoader] = useState(false)
    const [calendar, setCalendar] = useState(false)

    //estados globales (falta armar redux)
    
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
        dispatch(getSearch(travels))
    }

    function renderCalendar() {
        if (!calendar) setCalendar(true)
        else setCalendar(false)
    }

    return (
        <div className={style.searchbar}>
            <div>
                <input
                    onChange={(e) => handleInputChange(e)}
                    type='search'
                    value={travels}
                    placeholder="Buscar un viaje..."
                    onKeyPress={(e => {
                        if (e.key === 'Enter') {
                            // dispatch(/*accion para limpiar el search*/)
                            dispatch(getSearch(travels))
                            setLoader(true)
                        }
                    })}
                />
                <button id={style.btnSearchBar} type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            </div>
        </div>
    )
}