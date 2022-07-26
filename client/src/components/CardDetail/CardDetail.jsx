import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTripById } from '../../redux/actions/getTripById';
// import { getUserById } from '../../redux/actions/getUserById';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import style from './CardDetail.module.css'
import Spinner from 'react-bootstrap/Spinner';
import { getDriverById } from '../../redux/actions/getDriverById.js'


function CardDetail({ id, show, fullscreen, setShow }) {

    const dispatch = useDispatch();
    const trip = useSelector((state) => state.tripById);
    const driver_id = trip.driver_id


    useEffect(() => {
        dispatch(getTripById(id))
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getDriverById(driver_id))
    }, [driver_id])

    const driver = useSelector(state => state.driverById)
    console.log(driver)
    return (
        <>
            <Modal contentClassName={style.myModal} show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {  Object.keys(trip).length !== 0 ?
                    <div>
                        <div className={style.backdet}>
                            <div className={style.titleDetail}>
                                <h1 className={style.titleY}>{trip.origin} </h1>
                                <h1 className={style.titleW}>  -  </h1>
                                <h1 className={style.titleY}> {trip.destination}</h1>
                            </div>
                            <div className={style.propsDetail}>
                                <div className={style.propsDetail}>
                                    <div className={style.textDetail}>
                                        <h2 className={style.h2Det}>Fecha de partida: {trip.start_date.slice(0, 10)}</h2>
                                        <h2 className={style.h2Det}>Fecha de llegada: {trip.finish_date.slice(0, 10)}</h2>
                                        <h2 className={style.h2Det}>Capacidad: {trip.capacity}</h2>
                                        <h2 className={style.h2Det}>Datos del automovil: </h2>
                                        <h2 className={style.h2Det}>Marca: {driver.cars[0].brand}</h2>
                                        <h2 className={style.h2Det}>Modelo: {driver.cars[0].model}</h2>
                                        <h2 className={style.h2Det}>Año: {driver.cars[0].year}</h2>
                                        <h2 className={style.h2Det}>Color: {driver.cars[0].color}</h2>
                                    </div>
                                    <div className={style.carruselDetail}>
                                        <Carousel>
                                            {trip.hasOwnProperty('album') && trip.album.map((e, i) => {
                                                return (
                                                    <Carousel.Item key={i}>
                                                        <img className={style.imgn} src={e} alt="First slide" />
                                                    </Carousel.Item>
                                                )
                                            })}
                                        </Carousel>
                                    </div>
                                </div>
                                <h2 className={style.priceDetail}>Precio: AR$ {trip.price}</h2>
                                {/* <Link> */}
                                <div className={style.linkDriver}>
                                    <p className={style.textDriver}>Conductor: {driver.user.name + '   ' + driver.user.last_name} </p>
                                    <div className={style.box1}>
                                        <div className={style.box2}>
                                            {/* <img scr={} alt='not found'/> */}
                                        </div>
                                    </div>
                                    {/* <p>{trip.driver[arr[0]]} {trip.driver[arr[1]]}</p> */}
                                    <p className={style.textDriver}>Rating: {driver.rating}</p>
                                </div>
                            </div>
                        </div>
                        </div>
                        :
                        <Spinner animation="grow" />
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
export default CardDetail;