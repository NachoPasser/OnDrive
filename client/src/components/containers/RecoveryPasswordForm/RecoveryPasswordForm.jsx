import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useField } from '../../hooks/useInputField';
import styles from "./RecoveryPasswordForm.module.css";

import InputField from '../../sections/InputField/InputField';
import Button from '../../sections/Button/Button';
;

const RecoveryPasswordForm = () => {
  const navigate = useHistory();

  const email = useField({type: "text"});
  
  function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      email: email.value,
    }
    console.log(Submit);
  }

  /* Funciones de prueba, solo para comprobar las rutas*/
  const registerPage = () => {
    onSubmit();
    navigate.push("/register");
  }

  const newPasswordPage = () => {
    navigate.push("/new-password");
  }

  return (
    <section className={styles.RecoveryFormContainer}>
      <h2 className={styles.TitleRecovery}>Recuperar Password</h2>
      <InputField
        {...email}
        icon={"email"}
        label={"Correo Electrónico"}
        name={"email"}
        placeholder={"Ingresa tu email"}
      />
      <span className={styles.BackHome}>Quiero <Link to='/login'>volver al inicio</Link></span>
      <Button title={"ENVIAR"} type={"primary"} size={"lg"} width={"Full"} onClick={newPasswordPage}/>
      <div className={styles.DividerText}>
        <span href="/">¿No tienes un usuario?</span>
      </div>
      <Button title={"REGÍSTRATE"} type={"secondary"} size={"md"} width={"SemiFull"} onClick={registerPage}/>
    </section>
  )
}

export default RecoveryPasswordForm;