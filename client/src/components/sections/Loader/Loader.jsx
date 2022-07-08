import React from 'react';

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <section className={styles.LoaderContainer}>
      <div className={styles.BackgroundLoader}></div>
      <div className={styles.PinLoader}></div>
      <div className={styles.CarLoader}></div>
      <h4 className={styles.Cargando}>Cargando...</h4>
    </section>
  )
}

export default Loader;