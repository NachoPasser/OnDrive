import React, { useState } from "react";
// import { BsStarFill } from 'react-icons/bs'
import styles from './HomeCardProvisional.module.css'
import Carousel from 'react-bootstrap/Carousel';
import CardDetail from "../../CardDetail/CardDetail";
import Spinner from 'react-bootstrap/Spinner'
import { FaStar } from "react-icons/fa";

const HomeCard = ({ id, price, capacity, start_date, finish_date, origin, destination, album }) => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    if(origin.split(",").length > 1)origin= origin.split(',').slice(0,1)
    if(destination.split(",").length > 1)destination= destination.split(',').slice(0,1)
    //console.log(rating)
    // start_date = start_date.slice(0, 10)
    // finish_date = finish_date.slice(0, 10)
    const pruebaVotos = 15;
    return (
        <div className={styles.comp_card}>
            <div className={styles.card} onClick={() => handleShow(true)}>
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
                    <p className={styles.titlec}> De {origin} a {destination}</p>
                    <div className={styles.otherText}>
                        <p>Salida: {new Date(start_date).toLocaleDateString()}</p>
                        <p>Regreso: {new Date(finish_date).toLocaleDateString()}</p>
                        <p>Capacidad: {capacity}</p>
                    </div>
                    <div className={styles.UL}>
                        <div className={styles.pricebox}>
                            <p className={styles.titleprice}>AR$ {price} </p>
                        </div>
                    </div>
                    {/* <div className={styles.cardstars}>
                        <div>
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                    <FaStar
                                        className={styles.star}
                                        color={ratingValue <= Math.floor(rating) ? "#fed428" : "#a7a1a1"}
                                        size={15}
                                    />
                                )
                            }
                            )}
                        </div>
                        <div>
                            <p className={styles.rating}>{rating}/5 - {pruebaVotos} Votos</p>
                        </div>
                    </div> */}
                </div>
            </div>
            <div>
                {show ? <CardDetail id={id} show={show} fullscreen={fullscreen} setShow={setShow} /> : null}
            </div>
        </div>
    );
}
export default HomeCard
