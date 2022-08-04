import React, { useState } from "react";
import logo from "../../assets/Logo/onDrive-logo.png";
import style from "./Help.module.css";
import NavBar from "../NavBar/navbar";


export default function Help() {
    const [help, setHelp] = useState(false)
    return (
        <div className={style.bigContainer}>
            {/* <NavBar help={help} /> */}
            <div className={style.titleE}>
                <h1 className={style.titleTextY}>Equipo de soporte</h1>
                <img src={logo} alt="logo-onDrive" className={style.logo} />
            </div>
            <div className={style.boxSubTitleP}>
                <h2 className={style.subTitleP}>Preguntas Frecuentes:</h2>
            </div>
            <div className={style.Answers}>
                <div className={style.boxAnswers}>
                    <h4 className={style.titleAns}>▪ ¿Qué hacer si eres nuevo en 🚘OnDrive?</h4>
                    <p className={style.answer}>Primero que nada, debes completar tu perfil para que otros usuarios puedan conocerte mejor. Asegurate de añadir una foto de perfil acorde. Los conductores siempre prefieren pasajeros con su perfil completo.</p>
                </div>
                <div className={style.boxAnswers}>
                    <h4 className={style.titleAns}>▪ ¿Como Reservar un viaje?</h4>
                    <p className={style.answer}>Para reservar un viaje lo primero que debes hacer es buscar el que mejor se acomode a tus necesidades. Para eso puedes usar los filtros que mostramos en la pagina principal. Luego debes entrar al viaje y seleccionar la opcion de reservar.</p>
                </div>
                <div className={style.boxAnswers}>
                    <h4 className={style.titleAns}>▪ Tuve un problema y ya no puedo viajar ¿Como cancelo el viaje?</h4>
                    <p className={style.answer}>Podras cancelar tu reserva hasta 72hs antes del viaje, recuperando el 90% de tu reserva. En caso de cancelar menos de 72hs antes, recuperaras solo el 50% de tu reserva.</p>
                </div>
                <div className={style.boxAnswers}>
                    <h4 className={style.titleAns}>▪ ¿Qué pasa si el conductor cancela el viaje?</h4>
                    <p className={style.answer}>Te devolveremos tu dinero, incluyendo los gastos de gestión. Si el conductor no cancela online, es importante que nos avises lo antes posible</p>
                </div>
            </div>
            <div className={style.boxSubTitleEmail}>
                <p className={style.subTitleEmail}>Tambien puedes comunicarte con nosotros al e-mail:</p>
                <p className={style.email}>ondrive.staff@gmail.com</p>
            </div>
        </div>
    )
}