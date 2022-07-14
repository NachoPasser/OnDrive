import React from 'react';
import styles from "./LoginForm.module.css";
import { useField } from '../../hooks/useInputField';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import InputField from '../../sections/InputField/InputField';
import Button from '../../sections/Button/Button';

const LoginForm = () => {
  const history = useHistory()
  const email = useField({type: "text"});
  const password = useField({type: "password"});
  
  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      email: email.value,
      password: password.value 
    }

    await axios.post('http://localhost:3001/auth/login', Submit)
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
      <Button title={"Loguéate con Google"} type={"secondary"} size={"md"} width={"SemiFull"} icon={"google"}/>
      <span className={styles.NewAccount}>No estoy registrado, <Link to='/register'>Crear una Cuenta</Link></span>

    </section>
  )
}

export default LoginForm;