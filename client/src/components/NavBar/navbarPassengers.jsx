import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from '../../assets/NavBar/on-logox0.5.png'
import style from './navbar.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function NavBar() {
    const history = useHistory()
    const handleClick = (e) => {
        e.preventDefault();
        window.location.reload()
    }
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        history.push('/home')
    };
    const handleShow = () => setShow(true);

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
                <button className={style.logout} onClick={() => {
                    handleShow()
                    window.localStorage.clear()
                    
                }}>Cerrar sesión</button>
            </div>
            <div className={style.items}>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/recovery-password">Recuperar contraseña</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/new-password">Cambiar contraseña</NavLink>
                </li>
                <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/home-drivers">Conductor</NavLink>
                </li>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Salir</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Estás seguro salir?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Salir
                    </Button>
                    </Modal.Footer>
                </Modal>
                {/* <li className={style.li}>
                    <NavLink className={style.navLink} exact to="/home">Volver al home general</NavLink>
                </li> */}
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