import React from 'react';
import styles from "./LoginAdminForm.module.css";
import {API_URL} from '../../config/enviroment';
import { useField } from '../hooks/useInputField';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import InputField from '../sections/InputField/InputField';
import Button from '../sections/Button/Button';

const LoginAdminForm= () => {
  const history = useHistory()
  const username = useField({type: "text"});
  const password = useField({type: "password"});

  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      username: username.value,
      password: password.value 
    }

    await axios.post(`${API_URL}/admin/login`, Submit)
    .then(datos => {
      window.localStorage.setItem('token', datos.data.token)
    })
    .catch(/TO DO/)
    history.push('/adminPanel')
  }

  return (
    <section className={styles.LoginFormContainer}>

      <h2 className={styles.TitleLogin}>Loguéate</h2>
      <InputField 
        {...username}
        icon={"user"}
        label={"Usuario"}
        name={"user"}
        placeholder={"Ingresa tu usuario"}
      />
      <InputField 
        {...password}
        icon={"password"}
        label={"Password"}
        name={"password"}
        placeholder={"Ingresa tu password"}
      />
      <Link to='/recovery-password' className={styles.ForgotPassword} >¿Olvidaste tu password?</Link>
      <Button title={"INICIAR SESIÓN"} type={"primary"} size={"lg"} width={"Full"} onClick={onSubmit}/>
    </section>
  )
}

export default LoginAdminForm;