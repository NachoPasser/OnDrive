import React from "react";
import Button from "../Sections/Button/Button";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

import logo from "../../assets/Logo/onDrive-logo.png";
import dptoImg from "../../assets/Landing/edificios y sombras.png"

const LandingPage = () => {
    return(
        <section className={styles.MainContainer}>
            <div className={styles.ImageContainer}>
                <img className={styles.LogoDesktop} src={logo} alt="logo-onDrive" />
                <img className={styles.middleImg} src={dptoImg} alt="img-top-login" />
                <div className={styles.TextContainer}>
                    <p className={styles.Text}>We work to improve the way of traveling around the country. Our goal is to connect Drivers and Passengers with the same destination. So they can accompany each other and reduce costs.</p>
                </div>
                <Link to="/home" className={styles.linkDecoration}><Button title={"HOME"} type={"primary"} size={"lg"} width={"100%"}/></Link>
                <div className={styles.TextContainer2}>
                    <p className={styles.yellowText}>developed by</p>
                    <p className={styles.Text}>HENRY STUDENTS</p>
                </div>
            </div>
        </section>
    )
}
export default LandingPage;