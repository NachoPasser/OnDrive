import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTrips } from "../redux/actions/getTrips";

//estilos
import style from '../Home/home.module.css'
import mapa from "../Home/home imagenes/mapa.png"
import ubicacion from "../Home/home imagenes/ubicacion.png"
import destino from "../Home/home imagenes/destino.png"
import sent from "../Home/home imagenes/sent.png"
import buscarTuRuta from "../Home/home imagenes/busca-tu-ruta.png"

//componentes
import FilterByDestination from "../SearchBar/filterByDestination";
import FilterByOrigin from "../SearchBar/filterByOrigin";
import SortAlphabetically from "../SearchBar/sortAlphabetically";
import SortByRating from "../SearchBar/sortByRating";
//import SearchBar from "../SearchBar/searchbar";
import HomeCard from "../components/containers/HomeCard/HomeCard"
import NavBar from "../NavBar/navbar.js";

//paginado
//loader
//errores


export default function Home() {

    //dispatch
    const dispatch = useDispatch()

    //estados globales
    const trips = useSelector(state => state.trips)

    useEffect(() => {
        dispatch(getTrips());
    }, [])

    return (
        <div className={style.containerAll}>
            <NavBar></NavBar>
            <div className={style.divisor}>
                <div className={style.homeIzquierda}>
                    <img id={style.logoBuscaTuRuta} src={buscarTuRuta} />
                    <div className={style.boxSearchAndFilters}>
                        <div className={style.buscador}>
                            <img id={style.logoUbicacion} src={ubicacion} />
                            <FilterByOrigin />
                            <img id={style.logoDestino} src={destino} />
                            <FilterByDestination />
                            <button className={style.buttonSent}> <img id={style.sent} src={sent} /> </button>
                        </div>
                        <div className={style.containerFiltros}>
                            <div className={style.filtrosAvanzados}>
                                <SortByRating style={style.filtros} />
                            </div>
                            <div className={style.filtroCapacidad}>
                                <h1 id={style.h1}><span id={style.span1}>Por </span><span id={style.span2}>capacidad</span></h1>
                            </div>
                        </div>
                    </div>
                    {
                        trips && trips.length ?
                            <div className={style.homecards}>
                                {
                                    trips.map(trip => {
                                        return (
                                            <div className={style.cards} key={trip.id}>
                                                <Link to={`/home/${trip.id}`}>
                                                    <HomeCard
                                                        key={trip.id}
                                                        img={trip.img}
                                                        rating={trip.rating}
                                                        capacity={trip.capacity}
                                                        start_date={trip.start_date}
                                                        finish_date={trip.finish_date}
                                                        origin={trip.origin}
                                                        destination={trip.destination}
                                                        price={trip.price}
                                                    />
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div> : null
                    }
                </div>
                <div className={style.homeDerecha}>
                    <img id={style.maps} src={mapa}></img>
                </div>
            </div>
        </div>
    )
}
