import React from "react";
import { useState } from "react";
import NavBar from "../NavBar/navbar";
import style from "./AboutUs.module.css";

export default function AboutUs() {
    const [aboutUs, setAboutUs] = useState(false)
    return (
        <div className={style.principalContainer}>
            {/* <NavBar aboutUs={aboutUs} /> */}
            <div className={style.titleBox}>
                <h1 className={style.titleP}>¿Quienes somos?🚘</h1>
            </div>
            <div className={style.subtitleBox}>
                <h3 className={style.subtitle}>Trabajamos para promover el Consumo Colaborativo en movilidad.</h3>
            </div>
            <div className={style.paragraphs}>
                <p className={style.text}>En On Drive ponemos en contacto a personanas que quieren realizar un viaje en común, y coinciden para hacerlo el mismo dia compartiendo gastos. Gracias al uso de veahiculos compartidos ayudamos a disminuir las emisiones de C02, colaborando con el medio ambiente.</p>
                <p className={style.text}>Asi tambien, brindamos la posibilidad de que puedas calcular el costo de tu proximo viaje. Ingresando tu origen, destino, el consumo de tu vehiculo, el combustible que utilizas, puedes estimar tus gastos, y si lo deseas, crear un viaje como conductor para compartir dichos gastos.</p>
                <p className={style.text}></p>
            </div>
        </div>
    )
}