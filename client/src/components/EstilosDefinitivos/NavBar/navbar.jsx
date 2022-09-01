import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../../assets/Logo/onDrive-logo.png'
import style from './navbar.module.css'

export default function NavBar({ aboutUs = true, help = true }) {

    const handleClick = (e) => {
        e.preventDefault();
        window.location.reload()
    }

    return (
        <ul className={style.nav}>
            {
                aboutUs && help
                    ?
                    <div className={style.liLogo}>
                        <NavLink className={style.navLink} exact to="/home" onClick={(e) => handleClick(e)}>
                            <img className={style.logo} src={logo} alt='No se encontró la imagen.' />
                        </NavLink>
                    </div>
                    :
                    <div className={style.liLogo}>
                        <NavLink exact to="/home" >
                            <img className={style.logo} src={logo} alt='No se encontró la imagen.' />
                        </NavLink>
                    </div>

            }
            {/* <div className={style.buttons}>
                <NavLink className={style.login} exact to="/login">Iniciar sesión</NavLink>
                <NavLink className={style.register} exact to="/register">Registrarse</NavLink>
            </div> */}
            <div className={style.items}>
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