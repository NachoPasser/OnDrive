import React from 'react';
import styles from "./LoginForm.module.css";
import { useField } from '../../../../hooks/useInputField';
import { Link, useHistory } from 'react-router-dom';
import { API_URL } from '../../../../config/enviroment';
import jwtDecode from 'jwt-decode';
import GoogleBtn from '../../../Sections/GoogleBtn/GoogleBtn';
import axios from 'axios'
import InputField from '../../../Sections/InputField/InputField';
import Button from '../../../Sections/Button/Button';

const LoginForm = () => {
  const history = useHistory()
  const email = useField({type: "text"});
  const password = useField({type: "password"});
  
  async function handleGoogleResponse(response){
    const {email} = jwtDecode(response.credential)
    await axios.post(`${API_URL}/auth/login`, {email})
    .then(datos => {
      window.localStorage.setItem('token', datos.data.token)
    })
    .catch(/TO DO/)
    history.push('/home')
  }

  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      email: email.value,
      password: password.value 
    }

    await axios.post(`${API_URL}/auth/login`, Submit)
    .then(datos => {
      window.localStorage.setItem('token', datos.data.token)
    })
    .catch(/TO DO/)
    history.push('/home')
  }

  return (
    <section className={styles.LoginFormContainer}>

      <h2 className={styles.TitleLogin}>Loguéate</h2>
      <InputField 
        {...email}
        icon={"email"}
        label={"Usuario o Correo Electrónico"}
        name={"email"}
        placeholder={"Ingresa tu email"}
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
      <div className={styles.DividerText}>
        <hr/>
        <span href="/">o inicia sesión con</span>
        <hr/>
      </div>
      <GoogleBtn handleResponse={handleGoogleResponse}></GoogleBtn>
      {/* <Button title={"Loguéate con Google"} type={"secondary"} size={"md"} width={"SemiFull"} icon={"google"}/> */}
      <span className={styles.NewAccount}>No estoy registrado, <Link to='/register'>Crear una Cuenta</Link></span>

    </section>
  )
}

export default LoginForm;