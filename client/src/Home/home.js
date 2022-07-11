import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeCard from "../components/containers/HomeCard/HomeCard.jsx";
import style from './home.module.css'
import { getTrips } from "../redux/actions/getTrips.js";

//componentes
import FilterByDestination from "../SearchBar/filterByDestination";
import FilterByOrigin from "../SearchBar/filterByOrigin";
import SortAlphabetically from "../SearchBar/sortAlphabetically";
import SortByRating from "../SearchBar/sortByRating";
import FilterByCapacity from "../SearchBar/filterByCapacity.jsx";
import { getTripsByDestination } from '../redux/actions/getTripsByDestination.js'
import { getTripsByOrigin } from "../redux/actions/getTripsByOrigin";
import SearchBar from "../SearchBar/searchbar";
import NavBar from "../NavBar/navbar.js";
import Fecha from "../SearchBar/filterByDate.jsx";
import Paging from "../components/Paging/Paging.jsx";

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
    const [travels, setTravels] = useState('')

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
            <NavBar></NavBar>
            <div className={style.divisor}>
                <div className={style.homeIzquierda}>
                    {/* <img id={style.logoBuscaTuRuta} src={buscarTuRuta} /> */}
                    <div className={style.boxSearchAndFilters}>
                        <div className={style.buscador}>
                            {/* <img id={style.logoUbicacion} src={ubicacion} /> */}
                            <FilterByOrigin />
                            {/* <img id={style.logoDestino} src={destino} /> */}
                            <FilterByDestination />
                            {/* <button className={style.buttonSent}> <img id={style.sent} src={sent} /> </button> */}
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
                        trips & trips.length ?
                            <div className={style.homecards}>
                                {
                                    trips.map(trip => {
                                        return (
                                            <div className={style.cards} key={trip.id}>
                                                <HomeCard
                                                    key={trip.id}
                                                    id={trip.id}
                                                    img={trip.img} //si dejamos el carusel en la card, tendria que ser un "album":[img1, img2, img3,...]
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
                    {/* <img id={style.maps} src={mapa}></img> */}
                </div>
            </div>
        </div>
    )
}
