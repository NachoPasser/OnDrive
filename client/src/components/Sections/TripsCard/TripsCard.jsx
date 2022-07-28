import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDriverById } from "../../../redux/actions/getDriverById";

import style from './TripCard.module.css'

const TripsCard = ({ driver_id, origin, destination, start_date, finish_date, capacity, price}) => {

    const dispatch = useDispatch();

    const driver = useSelector(state => state.driverById)

    const tel = 3874763981

    useEffect(() => {
        dispatch(getDriverById(driver_id))
        console.log(driver)
    }, [])

    return (
        <div>
            <div className={style.tripBox}>
                <span className={style.blueText2}> {origin} - {destination} </span>
                <span className={style.witheText}> - Salida: {start_date}</span>
                <span className={style.witheText}> - Llegada: {finish_date}</span>
                <span className={style.witheText}> - Lugares: {capacity}</span>
                <span className={style.witheText}> - Precio: AR${price}</span>
                <div className={style.driver}>
                    <span className={style.witheText}> - Conductor: </span>
                    <div className={style.driverContact}>
                        <span className={style.witheText}>{driver.user.name} {driver.user.last_name}</span>
                        <span className={style.witheText}> 📱{tel}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TripsCard