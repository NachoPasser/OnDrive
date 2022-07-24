import React, {useState} from "react";
// import { BsStarFill } from 'react-icons/bs'
import styles from './HomeCardProvisional.module.css'
import Carousel from 'react-bootstrap/Carousel';
import CardDetail from "../../CardDetail/CardDetail";
import Spinner from 'react-bootstrap/Spinner'
import { FaStar } from "react-icons/fa";

const HomeCard = ({ id, rating, price, capacity, start_date, finish_date, origin, destination, album }) => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    start_date = start_date.slice(0, 10)
    finish_date = finish_date.slice(0, 10)
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
                    <p className={styles.titlec}>{origin} to {destination}</p>
                    <div className={styles.otherText}>
                        <p>Start date: {start_date}</p>
                        <p>Finish date: {finish_date}</p>
                        <p>Capacity: {capacity}</p>
                    </div>
                    <div className={styles.UL}>
                        <div className={styles.pricebox}>
                            <p className={styles.titleprice}>U$ {price} </p>
                        </div>
                    </div>
                    <div className={styles.cardstars}>
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
                    </div>
                </div>
            </div>
            <div>
                {show ? <CardDetail id={id} show={show} fullscreen={fullscreen} setShow={setShow} /> : null}
            </div>
        </div>
    );
}
export default HomeCard
