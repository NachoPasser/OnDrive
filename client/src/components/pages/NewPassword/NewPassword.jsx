import React from 'react';
import NewPasswordForm from '../../containers/NewPasswordForm/NewPasswordForm';

import styles from "./NewPassword.module.css";
import logo from "../../../assets/Logo/onDrive-logo.png";
import imageTop from "../../../assets/NewPassword/NewPassword.png";

const NewPassword = () => {
  return (
    <section className={styles.MainContainer}>
      <section className={styles.ContainerNewPassword}>
      <div className={styles.ImageContainer}>
        <img className={styles.Image} src={imageTop} alt="img-top-register" />
        <img className={styles.LogoDesktop} src={logo} alt="logo-onDrive" />
        <p className={styles.Text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
      </div>
      <NewPasswordForm/>
      </section>
    </section>
  )
}

export default NewPassword;