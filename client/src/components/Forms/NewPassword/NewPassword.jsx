import React from 'react';
import NewPasswordForm from './NewPasswordForm/NewPasswordForm';
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
        <p className={styles.Text}>Asegurate de ingresar una nueva contraseña con mayusculas, minusculas y numeros, minimo 8 caracteres. Para tu seguridad, no la compartas con nadie.</p>
      </div>
      <NewPasswordForm/>
      </section>
    </section>
  )
}

export default NewPassword;