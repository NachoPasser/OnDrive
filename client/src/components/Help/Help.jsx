import React from "react";
import logo from "../../assets/Logo/onDrive-logo.png";
import { NavLink } from "react-router-dom";

import style from "./Help.module.css";

export default function Help(){
    return(
        <div>
            <div>
                <h1>Equipo de soporte</h1>
                <img src={logo} alt="logo-onDrive" />
            </div>
            <div>
                <h3>Preguntas Frecuentes:</h3>
            </div>
            <div>
                <h3>▪ ¿Qué hacer si eres nuevo en 🚘OnDrive?</h3>
                <p>Primero que nada, debes completar tu perfil para que otros usuarios puedan conocerte mejor. Asegurate de añadir una foto de perfil acorde. Los conductores siempre prefieren pasajeros con su perfil completo.</p>
            </div>
            <div>
                <h3>▪ ¿Como Reservar un viaje?</h3>
                <p></p>
            </div>
            <div>
                <h3>▪ Tuve un problema y ya no puedo viajar ¿Como cancelo el viaje?</h3>
                <p>Podras cancelar tu reserva hasta 72hs antes del viaje, recuperando el total de tu reserva. En caso de cancelar menos de 72hs antes, recuperaras solo el 70% de tu reserva.</p>
            </div>
            <div>
                <h3>▪ ¿Qué pasa si el conductor cancela el viaje?</h3>
                <p>Te devolveremos tu dinero, incluyendo los gastos de gestión. Si el conductor no cancela online, es importante que nos avises lo antes posible</p>
            </div>
            <div>
                <p>Tambien puedes comunicarte con nosotros al e-mail: ondrive.staff@gmail.com</p>
            </div>
            <div className={style.TextContainer2}>
                <p className={style.yellowText}>developed by</p>
                <p className={style.Text}>HENRY STUDENTS</p>
            </div>
        </div>
    )
}