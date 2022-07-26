import React from "react";
import car_error from "../../../assets/Loader/car-error.png";
import logo from "../../../assets/NavBar/logo-ondrive.png";

import styles from "./Error.module.css";

const Error = () => {
  return (
    <section className={styles.ErrorContainer}>
      <div className={styles.BackroundError}>
        <img src={logo} alt="OnDrive" className={styles.logo} />
        <div className={styles.CarError}>
          <img src={car_error} alt="Error" />
        </div>
        <h2 className={styles.Error}>Algo no salió como esperábamos</h2>
        <h5 className={styles.ErrorBottom}>
          estamos trabajando para solucionarlo
        </h5>
      </div>
    </section>
  );
};

export default Error;
