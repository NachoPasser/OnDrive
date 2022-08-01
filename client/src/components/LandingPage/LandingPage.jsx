import React from "react";
import Button from "../Sections/Button/Button";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

import logo from "../../assets/Landing/edificios y sombras.png";


const LandingPage = () => {
    return(
        <div className={styles.MainContainer}>
            <div className={styles.backgroundimag}>
                <div>
                    <img src={logo} alt="logo-onDrive" className={styles.LogoDesktop} />
                </div>
            </div>
            <div className={styles.TextContainer}>
                <p className={styles.Text}>
                    Trabajamos para mejorar la forma de viajar por el país. Nuestro objetivo es conectar a Conductores y Pasajeros con un mismo destino, para que puedan acompañarse y reducir gastos. Gracias al uso de vehiculos compartidos, ayudamos al medio ambiente disminuyendo la emision de CO2.
                </p>
                <p className={styles.Text}>
                    Por otro lado, ofrecemos la posibilidad a nuestros usuarios de calcular los gastos en combustible, en caso que decidan realizar un viaje por su cuenta, indicando origen, destino, tipo de combustible y consumo de su vehiculo. Mostramos asi tambien un mapa con la mejor ruta posible.
                </p>
            </div>
            <div className={styles.linkDecoration}>
                <Link to="/home" className={styles.linkDecoration}>
                    <Button title={"Ir a App"} type={"primary"} size={"md"} width={"100%"}/>
                </Link>
            </div>
            <div className={styles.nothing}></div>
            <div className={styles.TextContainer2}>
                <p className={styles.yellowText}>desarrollado por</p>
                <p className={styles.witheText}>HENRYS</p>
            </div>
        </div>
    )
}
export default LandingPage;