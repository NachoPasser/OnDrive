import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { getTripById } from '../../../redux/actions/getTrips';
import { Link } from 'react-router-dom';
import style from './CardDetail.module.css'


function Details({
	match: {
		params: { id },
	},
}) {
	const dispatch = useDispatch();
	const trip = useSelector((state) => state.tripById);

    useEffect(() => {
        dispatch(getTripById(id))
    }, [dispatch, id]);

	return (
		<div className={style.wallpaper}>
			<div className={style.bigContainer}>
				<Link to="/home" className={style.linkDecoration}>
					<Button title={"HOME"} type={"primary"} size={"lg"} width={"100%"}/>
				</Link>
				<div className={style.backtrs}>
					<div>
						<h1>Trip From {trip.origin} to {trip.destination}</h1>
						<h2>Start date: {trip.start_date}</h2>
						<h2>Finish date: {trip.finish_date}</h2>
						<h2>Capacity: {trip.capacity}</h2>
						<h2>Rating: {trip.rating}</h2>
						<h3>Price: {trip.price}</h3>
					</div>
					<div>
						<h1>Driver: {trip.driver.name} {trip.driver.lastname}</h1>
						<h2>Car: {trip.car.color} {trip.marca}</h2>
						<div className={style.image}></div>
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default Details;