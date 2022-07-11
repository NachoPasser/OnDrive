import React from "react";
import { Link } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs'
import styles from './HomeCardProvisional.module.css'
import Carousel from 'react-bootstrap/Carousel';
import car from '../../../assets/HomeCard/Toyota-Corolla-2001.jpg'
import salta from '../../../assets/HomeCard/L_134003_salta001.jpg'
import cordoba from '../../../assets/HomeCard/WhatsApp-Image-2021-09-06-at-15.14.27-800x400.jpeg'

const HomeCard = ({ id, rating, price, capacity, start_date, finish_date, origin, destination }) => {
    const album = [car, salta, cordoba]
    start_date = start_date.slice(0, 10)
    finish_date = finish_date.slice(0, 10)
    return (
        <div className={styles.comp_card}>
            <div className={styles.card}>
                <Link to={`/trip/${id}`}>
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
                </Link>
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
                        <p>Rating: {rating}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomeCard
