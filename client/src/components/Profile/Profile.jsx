import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from "../../redux/actions/getUserById";
import { getAllTripsReviews } from "../../redux/actions/getAllTripReviews";
import Review from "../Sections/Review/Review";
import style from "./Profile.module.css";
import NavBarProfile from "../NavBar/navbarProfile.jsx";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import ImageProfile from "./ImageProfile/ImageProfile";


export default function Profile() {
  const dispatch = useDispatch()

  const reviews = useSelector(state => state.reviews) //obtengo todas las reviews que realizo el usuario
  const user = useSelector(state => state.userById) //obtengo el perfil del usuario

  useEffect(() => {
    dispatch(getUserById(localStorage.getItem('token')))
    //despacho una accion que me devuelve el perfil del usuario
  }, [dispatch])

  useEffect(() => {
    if (user.hasOwnProperty('name')) dispatch(getAllTripsReviews(user.user_id))
    //despacho una accion que me devuelve TODAS LAS RESEÑAS QUE HIZO EL USUARIO
  }, [user,dispatch])

  return (
    <div id="all">
      {console.log(user)}
      <div className={style.pasajero}>
        <NavBarProfile />
        <div className={style.top} style={{ color: 'white' }}>
          <div className={style.userData}>
            <h1 className={style.name}>{user.name} {user.last_name}</h1>
            <span className={style.mail}>{user.email}</span>
          </div>
          <ImageProfile image={user.image}/>
        </div>
        <div className={style.PassVsDr}>
          <div>
            <h2 className={style.witheText}>Como pasajero</h2>
            {reviews && user.trips.length //Si reviews existe (ya que se inicializa en null)  y el usuario compro viajes entonces muestro los viajes junto a su reseña actual si la tienen:
            ? <div>
                <h4 className={style.yellowTitle}>Viajes comprados:</h4>
                {//ACLARACION: en la renderizacion de Review estoy pasando en actualRating y actualComment:
                //el rating y comentario actual de la reseña de ese viaje
                //Si la reseña no existe, ya que el usuario aún no lo reseño, entonces devuelven undefined (esto es importante en Review)
                user.trips.map((t, i) => { //recorro los viajes del usuario y voy renderizandolos en ese div junto a Review
                  return <div id="viajes">
                    <div className={style.tripBox}>
                      <span className={style.blueText2}> {t.origin} - {t.destination} </span>
                      <span className={style.witheText}> - Salida: {t.start_date}</span>
                      <span className={style.witheText}> - Llegada: {t.finish_date}</span>
                      <span className={style.witheText}> - Lugares: {t.capacity}</span>
                      <span className={style.witheText}> - Precio: AR${t.price}</span>
                      <div className={style.driver}>
                        <span className={style.witheText}> - Conductor: </span>
                        <div className={style.driverContact}>
                          <span className={style.witheText}> - Conductor: </span>
                          <span className={style.witheText}> - Conductor: </span>
                        </div>
                      </div>
                    </div>
                    <Review 
                      user_id={user.user_id}
                      trip_id={t.trip_id}
                      driver_id={t.driver_id}
                      actualRating={reviews[i]?.rating}
                      actualComment={reviews[i]?.comment}
                    />
                  </div>
                })}
              </div>
            : <h5 className={style.Negative}>No Tiene viajes próximos</h5> //si reviews no existe entonces no muestro los viajes del usuario (necesito saber si hizo alguna reseña sí o sí)
            }
          </div>
          <div>
            <h2 className={style.witheText}>Como conductor</h2>
            {user.driver //si el usuario es conductor
            ? <div className={style.DriverBox}>
                <div className={style.space}><span className={style.blueText}>Licencia: </span> <span className={style.witheText}> {user.driver.license}</span></div>
                <div className={style.space}><span className={style.blueText}>DNI: </span> <span className={style.witheText}> {user.driver.DNI}</span></div>
                <div className={style.space}><span className={style.blueText}>Compañía de seguros: </span> <span className={style.witheText}> {user.driver.car_insurance}</span></div>
                <div className={style.carsBox}>
                  <span className={style.blueText}>Autos: </span>
                  {//LINEA 77: lo escribo aca porque arriba no puedo, en esa linea ejecuto getRating, definido en linea 10
                  user.driver.cars.map(c => { //Recorro los autos del conductor y voy renderizandolos en ese div
                    return  <div classname={style.carsDetail}>
                              <div><span className={style.witheText}>- modelo: {c.model}</span></div>
                              <div><span className={style.witheText}>- color: {c.color}</span></div>
                            </div>
                  })}
                  <div>
                    <li className={style.li}>
                        <NavLink className={style.navLink2} exact to="/addCar">Añadir Auto</NavLink>
                    </li>
                  </div>
                </div>
                <div className={style.ratingDriver}><span className={style.blueText}>Rating: </span>
                  <div className={style.starsRating}>
                    <div>
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                          return (
                            <FaStar
                              className={style.star}
                              color={ratingValue <= Math.floor(user.driver.rating) ? "#fed428" : "#a7a1a1"}
                              size={25}
                            />
                          )
                      })}
                    </div>
                    <div>
                      <span className={style.witheText}>{user.driver.rating}/5 - {user.driver.amountReviews} Votos</span>
                    </div>
                  </div>
                </div>
                <div>
                  
                  
                  {user.driver.trips.length && user.driver.trips.map(t => { //Si el usuario hizo viajes como conductor entonces, recorro esos viajes
                    return t.reviews.map(r => { //Recorro todas las RESEÑAS del viaje en el que estamos parados (ya que un mismo viaje puede tener muchas reseñas)
                      return  <div>
                                <span className={style.blueText}>Reseñas: </span>
                                <div className={style.reviewsBox}>
                                  <div>
                                    {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;
                                      return (
                                        <FaStar
                                          className={style.star}
                                          color={ratingValue <= r.rating ? "#fed428" : "#a7a1a1"}
                                          size={20}
                                        />
                                      )
                                    })}
                                  </div>
                                  <span className={style.witheText}>▪ {r.comment}</span>
                                </div>
                              </div>                              
                    })
                  })}
                </div>
                <div>
                  <span className={style.blueText}>Próximos Viajes: </span>
                  {user.driver.trips.length && !user.driver.trips.reviews && user.driver.trips.map(t => { //Si el usuario hizo viajes como conductor entonces, mustro esos viajes
                    return  <div className={style.tripBox}>
                              <span className={style.yellowText}> De {t.origin} a {t.destination} </span>
                              <span className={style.witheText}> - Salida: {t.start_date}</span>
                              <span className={style.witheText}> - Llegada: {t.finish_date}</span>
                              <span className={style.witheText}> - Capacidad: {t.capacity}</span>
                              <span className={style.witheText}> - Precio: AR${t.price}</span>
                            </div>})}
                </div>
              </div>
            : <div>
                <h5 className={style.Negative}>Aún no eres conductor</h5>
                <div className={style.items}>
                  <li className={style.li}>
                      <NavLink className={style.navLink} exact to="/driver">Hacerme Conductor</NavLink>
                  </li>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
