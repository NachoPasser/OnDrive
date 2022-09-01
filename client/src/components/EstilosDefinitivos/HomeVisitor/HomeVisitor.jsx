import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from './HomeVisitor.module.css'
import { getTrips } from "../../../redux/actions/getTrips";
import { getFilteredTrips } from "../../../redux/actions/getFilteredTrips.js";
import { getUserByToken } from "../../../redux/actions/getUserByToken.js"
import { getDriversByRating } from "../../../redux/actions/getDriversByRating";
//estilos
import ubicacion from "../../../assets/Home/ubicacion.png"
import destino from "../../../assets/Home/destino.png"
import sent from "../../../assets/Home/sent.png"
import buscarTuRuta from "../../../assets/Home/busca-tu-ruta.png"
import beDriver from "../../../assets/Test/beDriver.png"
import topDriver from '../../../assets/Test/Top Drivers.png'
import topDriverBadge from '../../../assets/Test/topDriverBadge.png'
import star from '../../../assets/Home/rating.png'
import clock from '../../../assets/Home/clock.png'
import logo from '../../../assets/Logo/onDrive-logo.png'
import { Rating } from "@mui/material";
//componentes
import HomeCard from "../../Estilos/HomeCard";
import FilterByDestination from "../../Filters/filterByDestination";
import FilterByOrigin from "../../Filters/filterByOrigin";
import SortByRating from "../../Sorts/sortByRating";
import SortByProximity from "../../Sorts/sortByProximity";
import FilterByCapacity from "../../Filters/filterByCapacity.jsx";
import NavBar from '../NavBar/navbar';
import Fecha from "../../Filters/filterByDate.jsx";
import Paging from "../../Paging/Paging.jsx";
import Map from "../../Map/map.jsx"
import Testimonial from "../Testimonial/Testimonial";

export default function HomeVisitorStyle() {
    //dispatch
    const dispatch = useDispatch()

    //estados globales
    var trips = useSelector(state => state.trips)
    const storeFilters = useSelector(state => state.filters)
    const ratings = useSelector(state => state.ratings)

    const [filters, setFilters] = useState({
        filterOrg: '',
        filterDest: ''
    })


    const [sorters, setSorters] = useState({
        rating: '',
        proximity: ''
    })

    //paginado
    const [numberOfPage, setNumberOfPage] = useState(1)
    let maxNumberOfPages = 0
    const cardsPerPage = 8

    if (trips.length > 0) maxNumberOfPages = Math.ceil(trips.length / cardsPerPage)

    //useEffects
    useEffect(() => {
        dispatch(getTrips());
        dispatch(getUserByToken(localStorage.getItem('token')))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setNumberOfPage(1)
    }, [trips])

    //handlers
    async function handleBtn() {
        dispatch(getFilteredTrips({ ...storeFilters, origin: filters.filterOrg, destination: filters.filterDest }))
    }

    return (
        <div className={style.containerAll}>
            <NavBar />
            <div>
                <div className={style.content}>
                    <div className={style.testimonialAndImg}>
                    <Testimonial/>
                    <div id={style.carImgDiv}>
                        <div id={style.textBtnContainer}>
                            <div id={style.carImgText}>
                                <p style={{display: 'flex', marginBottom:'0px'}}>
                                    <h1 className={style.carImgHeader} style={{color: '#FED428', marginRight: '5px'}}>¿</h1>
                                    <h1 className={style.carImgHeader}>Aun no eres</h1>
                                </p>
                                <p style={{display: 'flex', marginBottom:'0px'}}>
                                    <h1 className={style.carImgHeader}>parte de la comunidad</h1>
                                    <img id={style.logo} src={logo} alt="" />
                                    <h1 className={style.carImgHeader} style={{color: '#FED428'}}>?</h1>
                                </p>
                            </div>
                            <div id={style.authContainer}>
                                <div id={style.btnRegister}>
                                        <span id={style.registerText}>Uneté</span>
                                </div>
                                <div id={style.loginContainer}>
                                    <span id={style.authText}>¿Ya eres parte?</span>
                                    <div id={style.btnLogin}>
                                            <span id={style.loginText}>Iniciar sesión</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div id={style.filterAndCards}>
                    <div className={style.boxSearchAndFilters}>
                          <div className={style.sorts}>
                                <h2>Ordenes</h2>
                                <div id={style.sortRating}>
                                    <img id={style.star} src={star} alt="" />
                                    <SortByRating style={style} sorters={sorters} setSorters={setSorters} />
                                </div>
                                <div id={style.sortProximity}>
                                    <img id={style.clock} src={clock} alt="" />
                                    <SortByProximity style={style} sorters={sorters} setSorters={setSorters} />
                                </div>
                          </div>
                          <div className={style.filters}>
                            <h2>Filtros</h2>
                            <div id={style.filterOrigin}>
                                <img id={style.logoUbicacion} src={ubicacion} alt='No se encontró la imagen.' />
                                <FilterByOrigin style={style.inputFilterOrigin} filters={filters} setFilters={setFilters} />
                            </div>
                            <div id={style.filterDestination}>
                                <img id={style.logoDestino} src={destino} alt='No se encontró la imagen.' />
                                <FilterByDestination style={style.inputFilterDestination} filters={filters} setFilters={setFilters} />
                            </div>
                            <div id={style.filterSent} onClick={() => handleBtn()} disabled={true}>
                                <img id={style.filterSentImg} src={sent} alt='No se encontró la imagen.' />
                            </div>
                            <Fecha style={style} />
                          </div>
                          <div className={style.divCapacity}>
                                <h2>Capacidad</h2>
                                <FilterByCapacity style={style}/>
                          </div>
                            {/*}<button className={style.buttonSent} onClick={() => handleBtn()} disabled={true}>
                            </button>

                            <div className={style.buttons}>
                                {
                                    filters.filterOrg.length > 0 || filters.filterDest.length > 0
                                        ?
                                        <a className={style.buttonSent} onClick={() => handleBtn()}>
                                            <img id={style.sent} src={sent} alt='No se encontró la imagen.' />
                                        </a>
                                        :
                                        <div>
                                            <a className={style.buttonSentDisabled} href="#">
                                                <img id={style.sentDisabled} src={sent} alt='No se encontró la imagen.' />
                                            </a>
                                        </div>
                                }
                            </div>
                            */}
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

                                            {trip.isAvailable ? <HomeCard
                                                key={trip.trip_id}
                                                id={trip.trip_id}
                                                driver_id={trip.driver_id}
                                                album={trip.album}
                                                rating={trip.rating}
                                                capacity={trip.capacity}
                                                start_date={trip.start_date}
                                                finish_date={trip.finish_date}
                                                origin={trip.origin}
                                                destination={trip.destination}
                                                price={trip.price}
                                            />
                                                : null}
                                        </div>
                                    )
                                })
                                }
                            </div> : null
                    }

                </div>
                    {/* <Paging style={style} setNumber={setNumberOfPage} max={maxNumberOfPages} actualPage={numberOfPage} /> */}
                </div>
        </div>
    )
}
