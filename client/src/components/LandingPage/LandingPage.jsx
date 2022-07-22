import React from "react";
import Button from "../Sections/Button/Button";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

import logo from "../../assets/Logo/onDrive-logo.png";
import dptoImg from "../../assets/Landing/edificios y sombras.png"

const LandingPage = () => {
    return(
        <div className={styles.MainContainer}>
            <div className={styles.LogoDesktop}>
                <img src={logo} alt="logo-onDrive" />
            </div>
            <div className={styles.TextContainer}>
                <p className={styles.Text}>
                    We work to improve the way of traveling around the country. Our goal is to connect Drivers and Passengers with the same destination. So they can accompany each other and reduce costs.
                </p>
            </div>
            <div className={styles.linkDecoration}>
                <Link to="/home">
                    <Button title={"Ir a App"} type={"primary"} size={"lg"} width={"100%"}/>
                </Link>
            </div>
            <div className={styles.nothing}></div>
            <div className={styles.TextContainer2}>
                <p className={styles.yellowText}>developed by</p>
                <p className={styles.Text}>HENRY STUDENTS</p>
            </div>
        </div>
    )
}
export default LandingPage;