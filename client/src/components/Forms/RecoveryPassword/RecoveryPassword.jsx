import React from 'react';
import RecoveryPasswordForm from './RecoveryPasswordForm/RecoveryPasswordForm';
import styles from "./RecoveryPassword.module.css";
import logo from "../../../assets/Logo/onDrive-logo.png";
import imageTop from "../../../assets/Recovery Password/vector-recovery.png";

const RecoveryPassword = () => {
  return (
    <section className={styles.MainContainer}>
      <section className={styles.ContainerRecovery}>
      <div className={styles.ImageContainer}>
        <img className={styles.Image} src={imageTop} alt="img-top-register" />
        <img className={styles.LogoDesktop} src={logo} alt="logo-onDrive" />
        <p className={styles.Text}>¿Olvidaste tu contrasea? Te enviaremos un correo a tu email con la informacion para que puedas recuperarla.</p>
      </div>
      <img className={styles.Logo} src={logo} alt="logo-onDrive" />
      <RecoveryPasswordForm/>
      <img className={styles.ImageMobile} src={imageTop} alt="img-top-register" />
      </section>
    </section>
  )
}

export default RecoveryPassword;