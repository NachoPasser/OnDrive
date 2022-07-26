import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from './home.module.css'
import { getTrips } from "../../redux/actions/getTrips";
import { getFilteredTrips } from "../../redux/actions/getFilteredTrips.js";

//estilos
import ubicacion from "../../assets/Home/ubicacion.png"
import destino from "../../assets/Home/destino.png"
import sent from "../../assets/Home/sent.png"
import buscarTuRuta from "../../assets/Home/busca-tu-ruta.png"

//componentes
import HomeCard from "../Sections/HomeCard/HomeCard.jsx";
import FilterByDestination from "../Filters/filterByDestination";
import FilterByOrigin from "../Filters/filterByOrigin";
import SortByRating from "../Sorts/sortByRating";
import FilterByCapacity from "../Filters/filterByCapacity.jsx";
import NavBar from "../NavBar/navbar.js";
import Fecha from "../Filters/filterByDate.jsx";
import Paging from "../Paging/Paging.jsx";
import Map from "../Map/map.jsx"
import { useAuthorized } from "../../hooks/useAuthorized";

export default function Home() {
    //dispatch
    const dispatch = useDispatch()

    //estados globales
    var trips = useSelector(state => state.trips)
    const storeFilters = useSelector(state => state.filters)
    //estados locales
    const [calendar, setCalendar] = useState(false)

    const [filters, setFilters] = useState({
        filterOrg: '',
        filterDest: ''
    })

    const [sorters, setSorters] = useState({
        sortRating: '',
        sortAlphabetically: ''
    })
    
    //paginado
    const [numberOfPage, setNumberOfPage] = useState(1)
    let maxNumberOfPages = 0
    const cardsPerPage = 3

    if (trips.length > 0) maxNumberOfPages = Math.ceil(trips.length / cardsPerPage)

    //useEffects
    useEffect(() => {
        dispatch(getTrips());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setNumberOfPage(1)
    }, [trips])

    //handlers
    async function handleBtn() {
        dispatch(getFilteredTrips({...storeFilters, origin: filters.filterOrg, destination: filters.filterDest}))
    }

    function renderCalendar() {
        if (!calendar) setCalendar(true)
        else setCalendar(false)
    }


    return (
        <div className={style.containerAll}>
            <NavBar />
            <div className={style.divisor}>
                <div className={style.homeIzquierda}>
                    <img id={style.logoBuscaTuRuta} src={buscarTuRuta} alt='No se encontró la imagen.' />
                    <div className={style.boxSearchAndFilters}>
                        <div className={style.buscador}>
                            <img id={style.logoUbicacion} src={ubicacion} alt='No se encontró la imagen.' />
                            <FilterByOrigin filters={filters} setFilters={setFilters} />
                            <img id={style.logoDestino} src={destino} alt='No se encontró la imagen.' />
                            <FilterByDestination filters={filters} setFilters={setFilters} />
                            <button className={style.buttonSent} onClick={() => handleBtn()}> <img id={style.sent} src={sent} alt='No se encontró la imagen.' /> </button>
                        </div>
                        <div className={style.containerFiltros}>
                            <div className={style.filtrosAvanzados}>
                                <SortByRating style={style.filtros} sorters={sorters} setSorters={setSorters} />
                                {/* <SortAlphabetically style={style.filtros} sorters={sorters} setSorters={setSorters} /> */}
                                <FilterByCapacity style={style.filtros} />
                            </div>
                            {/* <SearchBar style={style} /> */}
                            <button id={style.calendario} onClick={renderCalendar}>
                                Filtrar por fecha de partida
                            </button>
                            {calendar && <Fecha />}
                        </div>
                    </div>
                    {
                        trips.length !== 0 ?
                            <div className={style.homecards}>
                                {trips.slice(
                                    (numberOfPage - 1) * cardsPerPage,
                                    (numberOfPage - 1) * cardsPerPage + cardsPerPage
                                ).map(trip => {
                                    return (
                                        <div className={style.cards} key={trip.trip_id}>
                                            <HomeCard
                                                key={trip.trip_id}
                                                id={trip.trip_id}
                                                album={trip.album}
                                                //rating={trip.rating}
                                                capacity={trip.capacity}
                                                start_date={trip.start_date}
                                                finish_date={trip.finish_date}
                                                origin={trip.origin}
                                                destination={trip.destination}
                                                price={trip.price}
                                            />
                                        </div>
                                    )
                                })
                                }
                            </div> : null
                    }
                    <Paging style={style} setNumber={setNumberOfPage} max={maxNumberOfPages} actualPage={numberOfPage} />
                </div>
                <div className={style.homeDerecha}>
                    <Map />
                </div>
            </div>
        </div>
    )
}
