import React from "react";
import styles from "./InputField.module.css";
import emailIcon from "../../../assets/Forms/email-icon.png";
import userIcon from "../../../assets/Forms/user-icon.png";
import passwordIcon from "../../../assets/Forms/password-icon.png";
import documentIcon from "../../../assets/Forms/document-icon.png";

const InputField = ({ icon, value, label, name, placeholder, type, onChange, error }) => {

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
          className={styles.InputField}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <span className={styles.ErrorInputField}>{error}</span> }
    </section>
  );
};

export default InputField;
