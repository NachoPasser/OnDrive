import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from "../../redux/actions/getUserById";
import photoDefault from "../../assets/User/silueta-1.jpg";
import logo from "../../assets/NavBar/on-logox0.5.png"
import style from "./Profile.module.css";
import { Link, NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import StartsRating from "../Sections/StarsRating/StarsRating";

export default function Profile() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userById)

  const pruebaRating = 4.3;
  const pruebaVotos = 15;

  useEffect(() => {
    dispatch(getUserById(localStorage.getItem('token')))
  }, [])

  const handleClick = (e) => {
    e.preventDefault();
    window.location.reload()
  }

  return (
    <div>
      <li className={style.liLogo}>
        <NavLink className={style.navLink} exact to="/home" onClick={(e) => handleClick(e)}>
          <img className={style.logo} src={logo} alt='No se encontró la imagen.' />
        </NavLink>
      </li>
      <div className={style.top} style={{ color: 'white' }}>
        <div className={style.userData}>
          <h1 className={style.name}>{user.name} {user.last_name}</h1>
          <span className={style.mail}>{user.email}</span>
        </div>
        <div className={style.profileImg}>
          <img src={photoDefault} alt="not found" className={style.imgprofile} />
        </div>
      </div>
      <Link to="/comments">
        <div className={style.starsBox}>
          <div className={style.vots}>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <FaStar
                  className={style.star}
                  color={ratingValue <= Math.floor(pruebaRating) ? "#fed428" : "#a7a1a1"}
                  size={35}
                />
              )
            }
            )}
            <p className={style.rating}>{pruebaRating}/5 - {pruebaVotos} Votos</p>
          </div>
          <div>
            <p className={style.rating}>▶</p>
          </div>
        </div>
      </Link>
      <div>

      </div>
    </div>
  )
}
