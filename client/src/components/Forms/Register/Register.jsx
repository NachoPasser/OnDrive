import React from 'react';
import RegisterForm from './RegisterForm/RegisterForm';
import styles from "./Register.module.css";
import logo from "../../../assets/Logo/onDrive-logo.png";
import imageTop from "../../../assets/Register/vector-register.png";

const Register = () => {
  return (
    <section className={styles.MainContainer}>
      <section className={styles.ContainerRegister}>
        <div className={styles.ImageContainer}>
          <img className={styles.Image} src={imageTop} alt="img-top-register" />
          <img className={styles.LogoDesktop} src={logo} alt="logo-onDrive" />
          <p className={styles.Text}>Registrate y completa tu perfil para acceder a los beneficios que brinda OnDrive. Asi, los conductores podran conocerte un poco mejor y podras unirte al viaje que desees. Ademas, podras calificar a tu conductor una vez finalizado el viaje.</p>
        </div>
        <RegisterForm/>
      </section>
    </section>
  )
}

export default Register;