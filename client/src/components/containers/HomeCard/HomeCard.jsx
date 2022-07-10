import React from "react";
import { Link } from 'react-router-dom';

import style from "../HomeCard/HomeCard.module.css"
import logo from "../../../NavBar/logo-ondrive.png"

export default function HomeCard( //destructuring
    { img, rating, capacity, start_date, finish_date, origin, destination, price }
) { //comienzo de la function
    return (
        <div className={style.container}>
            <img id={style.img} src={logo} alt=""></img>
            <p>Origen: {origin}</p>
            <p>Destino: {destination}</p>
            <p>Fecha de partida: {start_date}</p>
            <p>Fecha de llegada: {finish_date}</p>
            <p>Precio estimado: AR${price}</p>
            <p>Capacidad disponible: {capacity}</p>
            <p>Rating del conductor: {rating}</p>
        </div>
    );
}