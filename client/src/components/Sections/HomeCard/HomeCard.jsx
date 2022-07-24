import React from "react";
import { Link } from 'react-router-dom';
// import { BsStarFill } from 'react-icons/bs'
import styles from './HomeCardProvisional.module.css'
import Carousel from 'react-bootstrap/Carousel';
import { FaStar } from "react-icons/fa";

const HomeCard = ({ id, rating, price, capacity, start_date, finish_date, origin, destination, album }) => {
    start_date = start_date.slice(0, 10)
    finish_date = finish_date.slice(0, 10)
    const pruebaVotos = 15;
    console.log(id)
    return (
        <div className={styles.comp_card}>
            <div className={styles.card}>
                    <div className={styles.cardimage}>
                        <div>
                            <Carousel>
                                {album.map((e, i) => {
                                    return (
                                        <Carousel.Item key={i}>
                                            <Link to={`/trip/${id}`}>
                                            <img className={styles.imgn} src={e} alt="First slide" />
                                            </Link>
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
        </div>
    );
}
export default HomeCard
