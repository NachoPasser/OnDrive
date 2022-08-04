import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from './homePassengers.module.css'
import { getTrips } from "../../redux/actions/getTrips";
import { getFilteredTrips } from "../../redux/actions/getFilteredTrips.js";
import { getUserByToken } from "../../redux/actions/getUserByToken.js"
import { getDriversByRating } from "../../redux/actions/getDriversByRating";
import { NavLink } from "react-router-dom";
//estilos
import ubicacion from "../../assets/Home/ubicacion.png"
import destino from "../../assets/Home/destino.png"
import sent from "../../assets/Home/sent.png"
import buscarTuRuta from "../../assets/Home/busca-tu-ruta.png"
import beDriver from "../../assets/Test/beDriver.png"
import topDriver from '../../assets/Test/Top Drivers.png'
import topDriverBadge from '../../assets/Test/topDriverBadge.png'
import star from '../../assets/Home/rating.png'
import clock from '../../assets/Home/clock.png'
import { Rating } from "@mui/material";
//componentes
import HomeCard from "./HomeCard.jsx";
import FilterByDestination from "../Filters/filterByDestination";
import FilterByOrigin from "../Filters/filterByOrigin";
import SortByRating from "../Sorts/sortByRating";
import SortByProximity from "../Sorts/sortByProximity";
import FilterByCapacity from "../Filters/filterByCapacity.jsx";
import NavBar from "./navBar/navbarPassengers.jsx";
import Fecha from "../Filters/filterByDate.jsx";
import Paging from "../Paging/Paging.jsx";
import Map from "../Map/map.jsx"

export default function HomePassengerStyle() {
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
        dispatch(getDriversByRating())
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
            <div className={style.divisor}>
                <div className={style.homeIzquierda}>
                    <img id={style.logoBuscaTuRuta} src={buscarTuRuta} alt='No se encontró la imagen.' />
                    <Map />
                    
                    <div className={style.beDriver}>
                        <div className={style.beDriverContent}>
                            <h1 id={style.beDriverH1}>Sé un conductor OnDrive</h1>
                            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt voluptas sit quia voluptas sit.</p>
                            <NavLink to='/driver'>
                                <button id={style.join}>
                                    <span>Únete</span>
                                </button>
                            </NavLink>
                            <img src={beDriver} alt="" />
                        </div>
                    </div>
                    <div className={style.ranking}>
                        <div id={style.topDriver}>
                        <img src={topDriverBadge} alt="" />
                        <img src={topDriver} alt="" />
                        </div>
                                {
                                    ratings.slice(0, 10).map((d, i) => {
                                        return <div className={style.rankingRating}>
                                        <div id={style.rankingItems}>
                                        <div id={style.rank}>{i + 1}</div>
                                        <img id={style.rankingImg} src={d.user.image} alt="" />
                                        <div id={style.driverInfo}>
                                                <span>{d.user.name.split(' ')[0]} {d.user.last_name.split(' ')[0]}</span>
                                        </div>
                                        <div id={style.rating}>
                                        <Rating
                                        size="small"
                                        value={d.rating}
                                        readOnly
                                        />
                                        <span id={style.driverRating}>{d.rating}</span>
                                        <span id={style.amountReviews}>({d.amountReviews})</span>
                                        </div>
                                        {i !== 9 ? <div id={style.rankingLine}></div> : null}
                                        </div>
                                        </div>
                                        
                                    })
                                    
                                    
                                }
                    </div>
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
                    {/* <Paging style={style} setNumber={setNumberOfPage} max={maxNumberOfPages} actualPage={numberOfPage} /> */}
                </div>
            </div>
        </div>
    )
}
