import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from '../../assets/Logo/onDrive-logo.png'
import style from './navbar.module.css'

export default function NavBarPsg() {
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
            <li className={style.liLogo}>
                <NavLink className={style.navLink} exact to="/home-passengers" onClick={(e) => handleClick(e)}>
                    <img className={style.logo} src={logo} alt='No se encontró la imagen.' />
                </NavLink>
            </li>
            <div className={style.buttons}>
                <button className={style.logout} onClick={() => handleLogOut()}>Cerrar sesión</button>
            </div>
            <div className={style.items}>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/driver">Ser un conductor</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/profile">Perfil</NavLink>
                </li>
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