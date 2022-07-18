import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/NavBar/on-logox0.5.png'
import style from './navbar.module.css'

export default function NavBar() {

    const handleClick = (e) => {
        e.preventDefault();
        window.location.reload()
    }

    return (
        <ul className={style.nav}>
            <li className={style.liLogo}>
                <NavLink className={style.navLink} exact to="/home-passengers" onClick={(e) => handleClick(e)}>
                    <img className={style.logo} src={logo} alt='No se encontró la imagen.' />
                </NavLink>
            </li>
            <div className={style.buttons}>
                {/* <NavLink className={style.login} exact to="/login">Login</NavLink>
                <NavLink className={style.register} exact to="/register">Register</NavLink> */}
                <button className={style.logout} onClick={() => window.localStorage.clear()}>Logout</button>
            </div>
            <div className={style.items}>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/recovery-password">Recuperar contraseña</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/new-password">Cambiar contraseña</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/home">Volver al home general</NavLink>
                </li>
                {/* <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/community">Item 2</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/support">Item 1</NavLink>
                </li> */}
            </div>
        </ul>
    )
}