import React, { /*useEffect,*/ useState } from "react";
import { useDispatch } from "react-redux";
import { getSearch } from "../../redux/actions/getSearch";

export default function SearchBar({style}) {

    //dispatch
    const dispatch = useDispatch()

    //estados locales
    const [travels, setTravels] = useState('')
    // const [loader, setLoader] = useState(false)
    
    //ciclo de vida
    // useEffect(() => {
    //     setLoader(false)
    // }, [])

    //handlers
    function handleInputChange(e) {
        e.preventDefault()
        setTravels(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        // setLoader(true)
        // dispatch(/*accion para limpiar el search*/)
        dispatch(getSearch(travels))
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
                            // setLoader(false)
                        }
                    })}
                />
                <button id={style.btnSearchBar} type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            </div>
        </div>
    )
}