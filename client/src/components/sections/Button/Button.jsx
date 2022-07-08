import React from "react";
import styles from "./Button.module.css";

import iconGoogle from "../../../assets/Buttons/icon-google.png";
import iconGoogleDark from "../../../assets/Buttons/icon-google-dark.png";
import iconArrowRight from "../../../assets/Buttons/icon-arrow-right.png";
import iconArrowRightDark from "../../../assets/Buttons/icon-arrow-right-dark.png";

const Button = ({ title, type, size, width, onClick, icon }) => {
  const buttonType = {
    primary: styles.PrimaryButton,
    secondary: styles.SecondaryButton,
    accent: styles.AccentButton,
  };

  const buttonSize = {
    sm: styles.SmallButton,
    md: styles.MidButton,
    lg: styles.LargeButton,
  };

  const icons = {
    google: iconGoogle,
    googleDark: iconGoogleDark,
    arrowRight: iconArrowRight,
    arrowRightDark: iconArrowRightDark,
  };

  return (
    <section className={styles[width]}>
      <button
        className={`${styles.Button} ${buttonType[type]} ${buttonSize[size]}`}
        onClick={onClick}
      >
        {icon &&
          <img
            className={styles.ButtonIcon}
            src={
              type === "secondary"
              ?  icons[icon]
              : icons[`${icon}Dark`]
            }
            alt="icon-button"
          />
        }
        {title}
      </button>
    </section>
  );
};

export default Button;
