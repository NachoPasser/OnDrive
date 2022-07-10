import React from "react";
import {Link} from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs'
import styles from './HomeCard.module.css'
import Carousel from 'react-bootstrap/Carousel';
import car from '../../../assets/HomeCard/Toyota-Corolla-2001.jpg'
import salta from '../../../assets/HomeCard/L_134003_salta001.jpg'
import cordoba from '../../../assets/HomeCard/WhatsApp-Image-2021-09-06-at-15.14.27-800x400.jpeg'

const HomeCard = (/*{id, rating, price, capacity, start_date, finish_date, origin, destination, isAvailable, album }*/) => {
    const id = "01"
    const rating = [3.5, 4.7, 2, 1]
    const price = 25
    const capacity = 2
    const start_date = "5/10/22"
    const finish_date = "15/10/22"
    const origin = "Salta"
    const destination = "Cordoba"
    const isAvailable = true
    const album = [car, salta, cordoba]
    return (
        <div className={styles.comp_card}>
            <div className={styles.card}>
                <Link  to={`/trip/${id}`}>
                    <div className={styles.cardimage}>
                        <div>
                            <Carousel>
                                {album.map((e,i) => {
                                    return(
                                    <Carousel.Item key={i}>
                                    <img className={styles.imgn} src={e} alt="First slide"/>
                                    </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                            {/* <img scr={car} ></img> */}
                        </div>
                    </div>
                </Link>
                <div className={styles.cardtext}>
                    <p className={styles.titlec}>{origin} to {destination}</p>
                    <div className={styles.otherText}>
                        <p>Start date: {start_date}</p>
                        <p>Finish date: {finish_date}</p>
                        <p>Capacity: {capacity}</p>
                        <p>Available: {isAvailable}</p>
                    </div>
                    <div className={styles.cardstars}>
                        <div className={styles.star}>
                            {rating.map(e => <BsStarFill/>)}
                        </div>
                    </div>
                    <div className={styles.UL}>
                        <div className={styles.pricebox}>
                            <p className={styles.titleprice}>U$ {price} </p>
                        </div>
                    </div>
                </div>       
            </div>
        </div>
    );
}
export default HomeCard