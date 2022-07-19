import React, { useEffect, useState } from 'react';
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
  const [disabled, setDisable] = useState(true)
  const [hidden, setHidden] = useState(true)
  
  async function handleGoogleResponse(response){
    const {email} = jwtDecode(response.credential)
    try{
      const datos = await axios.post(`${API_URL}/auth/login`, {email})
      window.localStorage.setItem('token', datos.data.token)
      history.push('/home')
    } catch(e){
      setHidden(false)
    }
  }

  useEffect(() => {

    if(email.value && password.value){
      setDisable(false)
    } else{
      setDisable(true)
    }

  }, [email, password])

  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      email: email.value,
      password: password.value 
    }

    try{
      const datos = await axios.post(`${API_URL}/auth/login`, Submit)
      window.localStorage.setItem('token', datos.data.token)
      history.push('/home')
    } catch(e){
      email.setError(e.response.data.error)
      password.setError(e.response.data.error)
    }
  }

  return (
    <section className={styles.LoginFormContainer}>

      <h2 className={styles.TitleLogin}>Loguéate</h2>
      <InputField 
        {...email}
        icon={"email"}
        label={"Correo Electrónico"}
        name={"email"}
        placeholder={"Ingresa tu email"}
      />
      <InputField 
        {...password}
        icon={"password"}
        label={"Contraseña"}
        name={"password"}
        placeholder={"Ingresa tu contraseña"}
      />
      <Link to='/recovery-password' className={styles.ForgotPassword} >¿Olvidaste tu contraseña?</Link>
      <Button disabled={disabled} title={"INICIAR SESIÓN"} type={"primary"} size={"lg"} width={"Full"} onClick={onSubmit}/>
      <div className={styles.DividerText}>
        <hr/>
        <span href="/">o inicia sesión con</span>
        <hr/>
      </div>
      <GoogleBtn handleResponse={handleGoogleResponse}></GoogleBtn>
      <h4 hidden={hidden} style={{color: 'white'}}>No existe un usuario registrado con ese mail.</h4>
      {/* <Button title={"Loguéate con Google"} type={"secondary"} size={"md"} width={"SemiFull"} icon={"google"}/> */}
      <span className={styles.NewAccount}>No estoy registrado, <Link to='/register'>Crear una Cuenta</Link></span>
      <span className={styles.NewAccount}>¿Eres administrador?, <Link to='/loginAdmin'>Logueate aquí</Link></span>

    </section>
  )
}

export default LoginForm;