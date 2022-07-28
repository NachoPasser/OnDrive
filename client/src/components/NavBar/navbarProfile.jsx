import { Button } from "@mui/material";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from '../../assets/NavBar/on-logox0.5.png'
import style from './navbar.module.css'

export default function NavBarProfile() {
    const history = useHistory()
    const handleClick = (e) => {
        e.preventDefault();
        history.goBack()
    }

    const handleLogOut = () => {
        window.localStorage.clear()
        history.push('/home')
    }

    return (
        <ul className={style.nav}>
            <li className={style.liLogo}>
                <Button className={style.navLink} onClick={(e) => handleClick(e)}>
                    <img className={style.logo} src={logo} alt='No se encontró la imagen.' />
                </Button>
            </li>
            <div className={style.buttons}>
                <button className={style.logout} onClick={() => handleLogOut()}>Cerrar sesión</button>
            </div>
            <div className={style.items}>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/new-password">Cambiar contraseña</NavLink>
                </li>
            </div>
            <div className={style.items}>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/recovery-password">Recuperar contraseña</NavLink>
                </li>
            </div>
        </ul>
    )
}