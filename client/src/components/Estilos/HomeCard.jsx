import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './HomeCard.module.css'
import Carousel from 'react-bootstrap/Carousel';
import CardDetail from "../CardDetail/CardDetail";
// import Spinner from 'react-bootstrap/Spinner'
import photoDefault from "../../assets/User/silueta-1.jpg";
import { FaStar } from "react-icons/fa";
import { Rating } from "@mui/material";
import { getDriverById } from "../../redux/actions/getDriverById";
import { getUserById } from "../../redux/actions/getUserById";
import { useDate } from "../../hooks/useDate";
import seeTrip from '../../assets/Test/seeTrip.png'
const HomeCard = ({ handleVerif, userVerif, id, price, capacity, start_date, finish_date, origin, destination, album, rating, driver_id }) => {

    const dispatch = useDispatch();

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    const driverId = driver_id
    const driver = useSelector(state => state.driverById)
    const user = useSelector(state => state.userById)

    useEffect(() => {
        dispatch(getDriverById(driverId))
        // dispatch(getUserById(localStorage.getItem('token')))
    }, [driverId])

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    useEffect(() => {
        // console.log(driver)
        if(driver.user && driver.user.hasOwnProperty('user_id')){
            dispatch(getUserById(driver.user.user_id))
        }
    }, [driver])

    if (origin.split(",").length > 1) origin = origin.split(',').slice(0, 1)
    if (destination.split(",").length > 1) destination = destination.split(',').slice(0, 1)
    //console.log(rating)
    // start_date = start_date.slice(0, 10)
    // finish_date = finish_date.slice(0, 10)
    return (
        <div className={styles.comp_card}>
            <div className={styles.card}>
                <div className={styles.cardimage}>
                    <div>
                        <Carousel>
                            {album.map((e, i) => {
                                return (
                                    <Carousel.Item key={i}>
                                        <img className={styles.imgn} src={e} alt="First slide" />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>
                </div>
                <div className={styles.cardtext}>
                    <h1 id={styles.places}>{origin} - {destination}</h1>
                    <div id={styles.capacity}>
                         <span id={styles.number}>{capacity}</span>
                         {capacity > 1 
                         ? (<div id={styles.divCapacity}>
                            <span>LUGARES</span>
                            <span>LIBRES</span>
                            </div>)
                         : (<div id={styles.divCapacity}>
                             <span>LUGAR</span>
                            <span>LIBRE</span>
                            </div>)}
                    </div>
                    <div className={styles.start}>
                        <span className={styles.typeDate}>Salida:</span>
                        <h1 className={styles.date}>{useDate(start_date).slice(0,5)}</h1>
                        <div className={styles.startLine}></div>
                    </div>
                    <div className={styles.finish}>
                        <span className={styles.typeDate}>Llegada:</span>
                        <h1 className={styles.date}>{useDate(finish_date).slice(0,5)}</h1>
                        <div className={styles.finishLine}></div>
                    </div>
                    <div id={styles.seeTrip} onClick={() => { if (userVerif) { handleVerif() } else { handleShow(true) } }}>
                        <span>Ver detalles</span>
                        <img src={seeTrip} alt="" />
                    </div>
                </div>
                <div className={styles.footer}>
                        <img id={styles.imgProfile} src={photoDefault} alt="" />
                        <div id={styles.rating}>
                        <Rating
                        size="small"
                        value={driver.rating}
                        readOnly
                        />
                        <span id={styles.driverRating}>{driver.rating}</span>
                        <span id={styles.amountReviews}>({driver.amountReviews})</span>
                        </div>
                        <div id={styles.driverInfo}>
                                <span>Conductor: </span>
                                <span>{user.name} {user.last_name}</span>
                        </div>
                </div>
            </div>
            <div>
                {show ? <CardDetail id={id} driverId={driverId} show={show} fullscreen={fullscreen} setShow={setShow} /> : null}
            </div>
        </div >
    );
}
export default HomeCard
