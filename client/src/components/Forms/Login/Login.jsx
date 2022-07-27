import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import styles from "./Login.module.css";
import logo from "../../../assets/Logo/onDrive-logo.png";
import imageTop from "../../../assets/Login/vector-login.png";

const Login = () => {
  return (
    <section className={styles.MainContainer}>
      <section className={styles.ContainerLogin}>
        <div className={styles.ImageContainer}>
          <img className={styles.Image} src={imageTop} alt="img-top-login" />
          <img className={styles.LogoDesktop} src={logo} alt="logo-onDrive" />
        </div>
      <LoginForm/>
      </section>
    </section>
  )
}

export default Login;
