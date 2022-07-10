import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

//logo
import logo from "../NavBar/on-logox0.5.png"

//estilos
import style from '../NavBar/navbar.module.css'

//componentes
import SearchBar from "../SearchBar/searchbar";

//falta importar las acciones de redux

export default function NavBar() {

    //dispatch
    //const dispatch = useDispatch()

    //handlers
    const handleClick = (e) => {
        e.preventDefault();
        window.location = "http://localhost:3000/home"
    }


    return (
        <ul className={style.nav}>
            <li className={style.liLogo}>
                <NavLink className={style.navLink} exact to="/home" onClick={(e) => handleClick(e)}>
                    <img className={style.logo} src={logo} />
                </NavLink>
            </li>
            <div className={style.buttons}>
                <NavLink className={style.login} exact to="/login">Login</NavLink>
                <NavLink className={style.register} exact to="/register">Register</NavLink>
            </div>
            <div className={style.items}>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/features">Item 4</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/pricing">Item 3</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/community">Item 2</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/support">Item 1</NavLink>
                </li>
            </div>
        </ul>
    )
}