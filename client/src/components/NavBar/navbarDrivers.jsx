import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import logo from '../../assets/NavBar/on-logox0.5.png'
import style from './navbar.module.css'


export default function NavBarDrivers({ passenger = true, create = true, publish = true }) {

    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault();
        window.location.reload()
    }

    const handleLogOut = () => {
        window.localStorage.clear()
        history.push('/home')
    }



    return (
        <ul className={style.nav}>
            {
                publish
                    ? <li className={style.liLogo}>
                        <NavLink className={style.navLink} exact to="/home-drivers" onClick={(e) => handleClick(e)}>
                            <img className={style.logo} src={logo} alt='No se encontró la imagen.' />
                        </NavLink>
                    </li>
                    :
                    <li className={style.liLogo}>
                        <NavLink className={style.navLink} exact to="/home-drivers" >
                            <img className={style.logo} src={logo} alt='No se encontró la imagen.' />
                        </NavLink>
                    </li>
            }
            <div className={style.buttons}>
                <button className={style.logout} onClick={() => handleLogOut()}>Cerrar sesión</button>
            </div>
            <div className={style.items}>
                {passenger &&
                    <li className={style.li}>
                        <NavLink className={style.navLink} exact to="/home-passengers">Pasajero</NavLink>
                    </li>}
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/profile">Perfil</NavLink>
                </li>
                {create &&
                    <li className={style.li}>
                        <NavLink className={style.navLink} exact to="/public">Publicar viaje</NavLink>
                    </li>
                }
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/help">Ayuda</NavLink>
                </li>{
                    <li className={style.li}>
                        <NavLink className={style.navLink} exact to="/aboutUs">Nosotros</NavLink>
                    </li>}
            </div>
        </ul>
    )
}