import React from "react";
import styles from "./InputField.module.css";
import emailIcon from "../../../assets/Forms/email-icon.png";
import userIcon from "../../../assets/Forms/user-icon.png";
import passwordIcon from "../../../assets/Forms/password-icon.png";
import documentIcon from "../../../assets/Forms/document-icon.png";

const InputField = ({ icon, value, label, name, readOnly = false, min = 0, max = 100, placeholder, type, onChange, error }) => {

  const icons = {
    email: emailIcon,
    password: passwordIcon,
    user: userIcon,
    document: documentIcon,
  };

  return (
    <section className={styles.Container}>
      {label && <label className={styles.InputLabel} htmlFor="input-field">{label}</label>}
      <div className={styles.InputContainer}>
        {icon && <img src={icons[icon]} className={styles.IconInputField} alt="input-icon"/>}
        <input
          readOnly={readOnly}
          className={styles.InputField}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />
      </div>
      {error && <span className={styles.ErrorInputField}>{error}</span> }
    </section>
  );
};

export default InputField;
