import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { getTripById } from '../../redux/actions/getTripById';
// import { getUserById } from '../../redux/actions/getUserById';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import style from './CardDetail.module.css'
import Spinner from 'react-bootstrap/Spinner';
import { getDriverById } from '../../redux/actions/getDriverById';


function CardDetail({id, show, fullscreen, setShow}) {
    
	const dispatch = useDispatch();
	const trip = useSelector((state) => state.tripById);
    useEffect(() => {
        dispatch(getTripById(id))
    },[dispatch, id]);
    if(Object.keys(trip).length) console.log(trip)

    const driver = useSelector((state)=> state.driverById)
    if (Object.keys(trip).length && !Object.keys(driver).length){
        dispatch(getDriverById(trip['driver_id']))
    }
    
    if(Object.keys(driver).length) console.log(driver)

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
                                <div className={style.textDetail}>
                                    <h2 className={style.h2Det}>Salida: {trip.start_date}</h2>
                                    <h2 className={style.h2Det}>Regreso: {trip.finish_date}</h2>
                                    <h2 className={style.h2Det}>Capacidad: {trip.capacity}</h2>
                                    <h2 className={style.h2Det}>Auto: {trip.marca}</h2>
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
                            <h2 className={style.priceDetail}>Precio: ${trip.price}</h2>
                            {/* <Link> */}
                                <div className={style.linkDriver}>
                                    <p className={style.textDriver}>Conductor: {Object.keys(driver).length && driver.name +' ' +driver.last_name}</p>
                                    <div className={style.box1}>
                                        <div className={style.box2}>
                                            {/* <img scr={} alt='not found'/> */}
                                        </div>
                                    </div>
                                    {/* <p>{trip.driver[arr[0]]} {trip.driver[arr[1]]}</p> */}
                                    <p className={style.textDriver}>Clasificación: {trip.rating}</p>
                                </div>
                            {/* </Link> */}
                        </div>
                    </div> :
                    <Spinner animation="grow" />
                }
                </Modal.Body>
            </Modal>
        </>
    )
}
export default CardDetail;