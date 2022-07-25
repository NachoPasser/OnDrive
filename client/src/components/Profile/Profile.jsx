import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { getUserById } from "../../redux/actions/getUserById";
import { getAllTripsReviews } from "../../redux/actions/getAllTripReviews";
import Review from "../Sections/Review/Review";
import photoDefault from "../../assets/User/silueta-1.jpg";
import logo from "../../assets/NavBar/on-logox0.5.png"
import style from "./Profile.module.css";
import './Profile.css'
export default function Profile() {
    const dispatch = useDispatch()

    const reviews = useSelector(state => state.reviews) //obtengo todas las reviews que realizo el usuario
    const user = useSelector(state => state.userById) //obtengo el perfil del usuario

    useEffect(() => {
      dispatch(getUserById(localStorage.getItem('token'))) 
      //despacho una accion que me devuelve el perfil del usuario
    }, [])

    useEffect(() => {
      if(user.hasOwnProperty('name')) dispatch(getAllTripsReviews(user.user_id))
      //despacho una accion que me devuelve TODAS LAS RESEÑAS QUE HIZO EL USUARIO
    }, [user])

    // const handleClick = (e) => {
    //   e.preventDefault();
    //   window.location.reload()
    // }

    return (
      <div>
        <div id="pasajero">
            <li className={style.liLogo}>
              <NavLink className={style.navLink} exact to="/home-passengers">
                <img className={style.logo} src={logo} alt='No se encontró la imagen.' />
              </NavLink>
            </li>
            <h1>Como pasajero</h1>
            <div className={style.top} style={{ color: 'white' }}>
              <div className={style.userData}>
                <h1 className={style.name}>{user.name} {user.last_name}</h1>
                <span className={style.mail}>{user.email}</span>
              </div>
              <div className={style.profileImg}>
                <img src={photoDefault} alt="not found" className={style.imgprofile} />
              </div>
            </div>
            {reviews && user.trips.length //Si reviews existe (ya que se inicializa en null)  y el usuario compro viajes entonces muestro los viajes junto a su reseña actual si la tienen:
            ? <div>
              <h3>Viajes comprados</h3>
              {//ACLARACION: en la renderizacion de Review estoy pasando en actualRating y actualComment:
              //el rating y comentario actual de la reseña de ese viaje
              //Si la reseña no existe, ya que el usuario aún no lo reseño, entonces devuelven undefined (esto es importante en Review)
              user.trips.map((t, i) => { //recorro los viajes del usuario y voy renderizandolos en ese div junto a Review
              return <div id="viajes">
                        <span>{t.origin} - {t.destination}</span>
                        <Review user_id={user.user_id} trip_id={t.trip_id} driver_id={t.driver_id} actualRating={reviews[i]?.rating} actualComment={reviews[i]?.comment } />
                    </div>
              })} 
              </div> 
            : null //si reviews no existe entonces no muestro los viajes del usuario (necesito saber si hizo alguna reseña sí o sí)
            }
        </div>
        { user.driver //si el usuario es conductor
        ? <div id="pasajero">
          <h1>Como conductor</h1>
          <span>licencia: {user.driver.license}</span>
          <span>compañía de seguros: {user.driver.car_insurance}</span>
          <span>DNI: {user.driver.DNI}</span>
          <span>rating: {user.driver.rating} ⭐</span>
          <h3>Autos</h3>
          {//LINEA 77: lo escribo aca porque arriba no puedo, en esa linea ejecuto getRating, definido en linea 10
          user.driver.cars.map(c => { //Recorro los autos del conductor y voy renderizandolos en ese div
            return <div id="pasajero">
                    <span>modelo: {c.model}</span>
                    <span>color: {c.color}</span>
                    </div>
          })}
          <h3>Reseñas</h3>
          {user.driver.trips.length && user.driver.trips.map(t => { //Si el usuario hizo viajes como conductor entonces, recorro esos viajes
            return t.reviews.map(r => { //Recorro todas las RESEÑAS del viaje en el que estamos parados (ya que un mismo viaje puede tener muchas reseñas)
              return <div>
                    <span>{t.origin} - {t.destination} </span>
                    <span>rating: {r.rating} ⭐ </span>
                    <span>comentario: {r.comment}</span>
                   </div>
            })
          })}
        </div>
        : null}
    </div>
  )
}
