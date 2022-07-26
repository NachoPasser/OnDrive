import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/NavBar/on-logox0.5.png'
import style from './navbar.module.css'

export default function NavBar() {

    return (
        <ul className={style.nav}>
            <li className={style.liLogo}>
                <NavLink className={style.navLink} exact to="/home">
                    <img className={style.logo} src={logo} alt='No se encontró la imagen.' />
                </NavLink>
            </li>
            <div className={style.buttons}>
                <NavLink className={style.login} exact to="/login">Iniciar sesión</NavLink>
                <NavLink className={style.register} exact to="/register">Registrarse</NavLink>
            </div>
            <div className={style.items}>
                {/* <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/home-passengers">Passengers</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/home-drivers">Drivers</NavLink>
                </li> */}
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/help">Ayuda</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/aboutUs">Nosotros</NavLink>
                </li>
            </div>
        </ul>
    )
}