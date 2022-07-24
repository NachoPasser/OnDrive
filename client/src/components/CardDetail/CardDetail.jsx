import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { getTripById } from '../../redux/actions/getTripById';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import style from './CardDetail.module.css'
import Spinner from 'react-bootstrap/Spinner';


function CardDetail({id, show, fullscreen, setShow}) {
    
	const dispatch = useDispatch();
	const trip = useSelector((state) => state.tripById);
    useEffect(() => {
        dispatch(getTripById(id))
    },[dispatch, id]);
    return (
        <>
            <Modal contentClassName={style.myModal} show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {  trip.length !== 0 && trip.id === id ?
                    <div>
                        <div className={style.backdet}>
                            <div className={style.titleDetail}>
                                <h1 className={style.titleY}>{trip.origin} </h1>
                                <h1 className={style.titleW}>  -  </h1>
                                <h1 className={style.titleY}> {trip.destination}</h1>
                            </div>
                            <div className={style.propsDetail}>
                                <div className={style.textDetail}>
                                    <h2 className={style.h2Det}>Start date: {trip.start_date}</h2>
                                    <h2 className={style.h2Det}>Finish date: {trip.finish_date}</h2>
                                    <h2 className={style.h2Det}>Capacity: {trip.capacity}</h2>
                                    <h2 className={style.h2Det}>Car: {trip.marca}</h2>
                                </div>
                                <div className={style.carruselDetail}>
                                    <Carousel>
                                        {trip.album.map((e, i) => {
                                            return (
                                                <Carousel.Item key={i}>
                                                    <img className={style.imgn} src={e} alt="First slide" />
                                                </Carousel.Item>
                                            )
                                        })}
                                    </Carousel>
                                </div>
                            </div>
                            <h2 className={style.priceDetail}>Price: ${trip.price}</h2>
                            {/* <Link> */}
                                <div className={style.linkDriver}>
                                    <p className={style.textDriver}>Driver: ???</p>
                                    <div className={style.box1}>
                                        <div className={style.box2}>
                                            {/* <img scr={} alt='not found'/> */}
                                        </div>
                                    </div>
                                    {/* <p>{trip.driver[arr[0]]} {trip.driver[arr[1]]}</p> */}
                                    <p className={style.textDriver}>Rating: {trip.rating}</p>
                                </div>
                            {/* </Link> */}
                            <div className={style.map}>
                                <h1>MAPA</h1>
                            </div>
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