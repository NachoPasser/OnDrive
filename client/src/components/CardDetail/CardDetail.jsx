import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { getTripById } from '../../redux/actions/getTripById';
// import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import style from './CardDetail.module.css'
import NavBar from '../NavBar/navbar';
import { useParams } from 'react-router-dom';
import MercadoPago from "../MercadoPago/loaderMP.js";


function CardDetail() {

    const {id} = useParams()
	const dispatch = useDispatch();
	const trip = useSelector((state) => state.tripById);
    
    
    useEffect(() => {
        dispatch(getTripById(id))
    },[dispatch, id]);

    let start;
    let finish;
    let arr = [];
    if(Object.keys(trip).length){
        for(let prop in trip.driver){
            arr.push(prop);
        };
        start= new Date(trip.start_date) 
        finish= new Date(trip.finish_date)
    };

    console.log(arr);

	return (
		<div>
            <NavBar></NavBar>
			<div className={style.backdet}>
                <div className={style.titleDetail}>
                    <h1 className={style.titleY}>{trip.origin} </h1>
                    <h1 className={style.titleW}>  -  </h1>
                    <h1 className={style.titleY}> {trip.destination}</h1>
                </div>
                <div className={style.propsDetail}>
					<div className={style.textDetail}>
						{ start && finish && <>
                        <h2 className={style.h2Det}>Start date: {start.toLocaleDateString()}</h2>
						<h2 className={style.h2Det}>Finish date: {finish.toLocaleDateString()}</h2>
                        </>}
						<h2 className={style.h2Det}>Capacity: {trip.capacity}</h2>
                        <h2 className={style.h2Det}>Car: {trip.marca}</h2>
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
            {Object.keys(trip).length ?
                <div> <MercadoPago idTrip={id} start={trip.start_date} finish={trip.finish_date} price={trip.price} origin={trip.origin} destination={trip.destination} /> </div>
                : <div>Cargando...</div>
            }
		</div>
	);
};

export default CardDetail;