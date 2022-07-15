import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useField } from '../../hooks/useInputField';
import styles from "./RecoveryPasswordForm.module.css";
import axios from 'axios'
import InputField from '../../sections/InputField/InputField';
import Button from '../../sections/Button/Button';
import { API_URL } from '../../../config/enviroment';

const RecoveryPasswordForm = () => {
  const navigate = useHistory();

  const email = useField({type: "text"});
  
  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      email: email.value,
    }
    await axios.post(`${API_URL}/pass`, Submit);
    navigate.push("/login");
  }


  const registerPage = () => {
    navigate.push("/register");
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
      <Button title={"ENVIAR"} type={"primary"} size={"lg"} width={"Full"} onClick={onSubmit}/>
      <div className={styles.DividerText}>
        <span href="/">¿No tienes un usuario?</span>
      </div>
      <Button title={"REGÍSTRATE"} type={"secondary"} size={"md"} width={"SemiFull"} onClick={registerPage}/>
    </section>
  )
}

export default RecoveryPasswordForm;