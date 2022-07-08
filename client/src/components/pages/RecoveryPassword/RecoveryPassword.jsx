import React from 'react';
import RecoveryPasswordForm from '../../containers/RecoveryPasswordForm/RecoveryPasswordForm';

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
        <p className={styles.Text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
      </div>
      <img className={styles.Logo} src={logo} alt="logo-onDrive" />
      <RecoveryPasswordForm/>
      <img className={styles.ImageMobile} src={imageTop} alt="img-top-register" />
      </section>
    </section>
  )
}

export default RecoveryPassword;