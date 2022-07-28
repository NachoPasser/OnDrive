import React from 'react';
import LoginAdminForm from './LoginAdminForm/LoginAdminForm';

import styles from "./LoginAdmin.module.css";
import logo from "../../../assets/Logo/onDrive-logo.png";
import imageTop from "../../../assets/Login/vector-login.png";

const LoginAdmin = () => {
  return (
    <section className={styles.MainContainer}>
      <section className={styles.ContainerLogin}>
        <div className={styles.ImageContainer}>
          <img className={styles.Image} src={imageTop} alt="img-top-login" />
          <img className={styles.LogoDesktop} src={logo} alt="logo-onDrive" />
          <p className={styles.Text}>¿Eres parte de la Familia OnDrive? Logeate como administrador con los datos que te facilitamos.</p>
        </div>
        <img className={styles.Logo} src={logo} alt="logo-onDrive" />
      <LoginAdminForm/>
      </section>
    </section>
  )
}

export default LoginAdmin;
