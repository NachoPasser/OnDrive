import React from 'react';
import styles from "./NewPasswordForm.module.css";

import InputField from '../../sections/InputField/InputField';
import Button from '../../sections/Button/Button';

import { useField } from '../../hooks/useInputField';
import vectorPassword from "../../../assets/NewPassword/NewPassword.png";

const NewPasswordForm = ({UserEmail}) => {

  const password = useField({type: "password"});
  const confirmPassword = useField({type: "password"});
  
  function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      password: password.value,
      confirmPassword: confirmPassword.value 
    }
    console.log(Submit);
  }
  
  return (
    
    <section className={styles.NewPasswordFormContainer}>
      <h2 className={styles.TitleNewPassword}>Nuevo Password</h2>
      <img className={styles.NewPasswordImage} src={vectorPassword} alt="vector-new-password" />
      <div className={styles.UserName}>
        <span>usuario:</span>
        <span>{UserEmail}</span>
      </div>
      <InputField
        {...password}
        icon={"password"}
        label={"Nuevo Password"}
        name={"password"}
        placeholder={"Ingresa tu nuevo password"}
      />
      <InputField
        {...confirmPassword}
        icon={"password"}
        label={"Confirmar Nuevo Password"}
        name={"password"}
        placeholder={"Ingresa tu nuevo password"}
      />
      <Button title={"CONFIRMAR"} type={"primary"} size={"lg"} width={"Full"} onClick={(e)=>onSubmit(e)}/>

    </section>
  )
}

export default NewPasswordForm;