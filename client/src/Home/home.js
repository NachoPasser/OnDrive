import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeCard from "../components/containers/HomeCard/HomeCard.jsx";
import style from './home.module.css'
import { getTrips } from "../redux/actions/getTrips";

//estilos
// import mapa from "../Home/home imagenes/mapa.png"
// import ubicacion from "../Home/home imagenes/ubicacion.png"
// import destino from "../Home/home imagenes/destino.png"
// import sent from "../Home/home imagenes/sent.png"
// import buscarTuRuta from "../Home/home imagenes/busca-tu-ruta.png"

//componentes
import FilterByDestination from "../SearchBar/filterByDestination";
import FilterByOrigin from "../SearchBar/filterByOrigin";
import SortAlphabetically from "../SearchBar/sortAlphabetically";
import SortByRating from "../SearchBar/sortByRating";
import { getTripsByDestination } from '../redux/actions/getTripsByDestination.js'
import { getTripsByOrigin } from "../redux/actions/getTripsByOrigin";
//import SearchBar from "../SearchBar/searchbar";
import NavBar from "../NavBar/navbar.js";

//paginado
//loader
//errores


export default function Home() {

    //dispatch
    const dispatch = useDispatch()

    //estados globales
    const trips = useSelector(state => state.trips)
    const [filters, setFilters] = useState({
        filterOrg: '',
        filterDest: ''
    })
    const [sorters, setSorters] = useState({
        sortRating: '',
        sortAlphabetically: ''
    })

    useEffect(() => {
        dispatch(getTrips());
    }, [])

    async function handleBtn(){
        console.log(filters) //ej {filterOrg: 'Salta', filterDest: 'Tucumán'}
        dispatch(getTripsByOrigin(filters.filterOrg))
        dispatch(getTripsByDestination(filters.filterDest))
      
    }

    useEffect(() => {
        console.log(trips)
    }, [trips])

    return (
        <div className={style.containerAll}>
            <NavBar/>
            <div className={style.divisor}>
                <div className={style.homeIzquierda}>
                    {/* <img id={style.logoBuscaTuRuta} src={buscarTuRuta} /> */}
                    <div className={style.boxSearchAndFilters}>
                        <div className={style.buscador}>
                            {/* <img id={style.logoUbicacion} src={ubicacion} /> */}
                            <FilterByOrigin filters={filters} setFilters={setFilters}/>
                            {/* <img id={style.logoDestino} src={destino} /> */}
                            <FilterByDestination filters={filters} setFilters={setFilters}/>
                            <button className={style.buttonSent} onClick={() => handleBtn()}> Buscar </button>
                            {/* <img id={style.sent} src={sent} /> */}
                        </div>
                        <div className={style.containerFiltros}>
                            <div className={style.filtrosAvanzados}>
                                <SortByRating style={style.filtros} sorters={sorters} setSorters={setSorters} />
                                <SortAlphabetically sorters={sorters} setSorters={setSorters}/>
                            </div>
                            <div className={style.filtroCapacidad}>
                                <h1 id={style.h1}><span id={style.span1}>Por </span><span id={style.span2}>capacidad</span></h1>
                            </div>
                        </div>
                    </div>
                    {
                        trips.length !== 0 ?
                            <div className={style.homecards}>
                                {
                                    trips.map(trip => {
                                        return (
                                            <div className={style.cards} key={trip.id}>
                                                    <HomeCard
                                                        key={trip.id}
                                                        id={trip.id}
                                                        img={trip.img}
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
                </div>
                <div className={style.homeDerecha}>
                    {/* <img id={style.maps} src={mapa}></img> */}
                </div>
            </div>
        </div>
    )
}
