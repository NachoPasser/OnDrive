import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import HomeCard from "../Sections/HomeCard/HomeCard.jsx";
import style from './home.module.css'
import { getTrips } from "../../redux/actions/getTrips";

//estilos
import ubicacion from "../../assets/Home/ubicacion.png"
import destino from "../../assets/Home/destino.png"
import sent from "../../assets/Home/sent.png"
import buscarTuRuta from "../../assets/Home/busca-tu-ruta.png"

//componentes
import FilterByDestination from "../Filters/filterByDestination";
import FilterByOrigin from "../Filters/filterByOrigin";
import SortAlphabetically from "../Sorts/sortAlphabetically";
import SortByRating from "../Sorts/sortByRating";
import FilterByCapacity from "../Filters/filterByCapacity.jsx";
import { getTripsByDestination } from '../../redux/actions/getTripsByDestination.js'
import { getTripsByOrigin } from "../../redux/actions/getTripsByOrigin";
import SearchBar from "../SearchBar/searchbar";
import NavBar from "../NavBar/navbarPassengers.jsx";
import Fecha from "../Filters/filterByDate.jsx";
import Paging from "../Paging/Paging.jsx";
import Map from "../Map/map.jsx"

//paginado
//loader
//errores


export default function Home() {
    //dispatch
    const dispatch = useDispatch()

    //estados globales
    const trips = useSelector(state => state.trips)

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

    const [numberOfPage, setNumberOfPage] = useState(1)
    let maxNumberOfPages = 0
    const cardsPerPage = 3

    if (trips.length > 0) maxNumberOfPages = Math.ceil(trips.length / cardsPerPage)

    useEffect(() => {
        dispatch(getTrips());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setNumberOfPage(1)
    }, [trips])

    //handlers
    async function handleBtn() {
        console.log(filters) //ej {filterOrg: 'Salta', filterDest: 'Tucumán'}
        dispatch(getTripsByOrigin(filters.filterOrg))
        dispatch(getTripsByDestination(filters.filterDest))

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
                                <SortAlphabetically style={style.filtros} sorters={sorters} setSorters={setSorters} />
                                <FilterByCapacity style={style.filtros} />
                            </div>
                            <SearchBar style={style} />
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
                                        <div className={style.cards} key={trip.id}>
                                            <HomeCard
                                                key={trip.id}
                                                id={trip.id}
                                                album={trip.album}
                                                rating={trip.rating}
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