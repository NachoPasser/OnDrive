import React, {useEffect} from 'react';
import styles from "./LoginAdminForm.module.css";
import {API_URL} from '../../../../config/enviroment';
import { useField } from '../../../../hooks/useInputField';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import InputField from '../../../Sections/InputField/InputField';
import Button from '../../../Sections/Button/Button';
import { useState } from 'react';

const LoginAdminForm= () => {
  const history = useHistory()
  const [disable, setDisable] = useState(true)
  const username = useField({type: "text"});
  const password = useField({type: "password"});

  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      username: username.value,
      password: password.value 
    }

    try{
      const datos = await axios.post(`${API_URL}/admin/login`, Submit)
      window.localStorage.setItem('token', datos.data.token)
      history.push('/adminPanel')
    } catch(e){
      username.setError(e.response.data.error)
      password.setError(e.response.data.error)
    }
  }

  useEffect(() => {
    let disable = false

    if(!username.value || !password.value){
      disable = true
    } 
    
    setDisable(disable)

  }, [username, password])

  return (
    <section className={styles.LoginFormContainer}>

      <h2 className={styles.TitleLogin}>Loguéate como Admin</h2>
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
        label={"Contraseña"}
        name={"password"}
        placeholder={"Ingresa tu password"}
      />
      <Link to='/login' className={styles.VolverLogin} >¿No eres un administrador?</Link>
      <Button disabled={disable} title={"INICIAR SESIÓN"} type={"primary"} size={"lg"} width={"Full"} onClick={onSubmit}/>
    </section>
  )
}

export default LoginAdminForm;