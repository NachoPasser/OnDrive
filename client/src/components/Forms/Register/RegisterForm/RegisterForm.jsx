import React, { useState, useEffect } from "react";
import InputField from "../../../Sections/InputField/InputField";
import Button from "../../../Sections/Button/Button";
import { useHistory } from "react-router-dom";
import { useField } from '../../../../hooks/useInputField';
import GoogleBtn from "../../../Sections/GoogleBtn/GoogleBtn";
import jwtDecode from 'jwt-decode'
import styles from "./RegisterForm.module.css";
import axios from 'axios'
import {API_URL} from "../../../../config/enviroment";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory()
  const email = useField({type: "text", field: 'email'});
  const name = useField({type: "text", field: 'name'});
  const lastName = useField({type: "text", field: 'last_name'});
  const password = useField({type: "password", field: 'password'});
  const confirmPassword = useField({type: "password", field: 'confirm_password'});
  const [disabled, setDisable] = useState(true)
  const [hidden, setHidden] = useState(true)

  async function handleGoogleResponse(response){
    const {email, given_name: name, family_name: last_name} = jwtDecode(response.credential)
    try{
      const data = await axios.post(`${API_URL}/auth/register`,  {email, name, last_name})
      window.localStorage.setItem('token', data.data.token)
      history.push('/home')
    } catch(e){
      setHidden(false)
    }
  }

  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      email: email.value,
      name: name.value,
      last_name: lastName.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    }
    try{
      const data = await axios.post(`${API_URL}/auth/register`, Submit)
      window.localStorage.setItem('token', data.data.token)
      history.push('/home')
    } catch(e){
      email.setError(e.response.data.error)
    }
  }

  useEffect(() => {
    let form = [email, password, name, lastName, confirmPassword]
    let disable = false
    
    for(const field of form){
      if(!field.value) disable = true
      if(field.error) disable = true
    }

    if(password.value !== confirmPassword.value){
      confirmPassword.setError('La contraseña actual no es igual a la ingresada anteriormente.' )
      disable = true
    }
    
    setDisable(disable)

  }, [email, password, name, lastName, confirmPassword])

  return (
    <section className={styles.RegisterFormContainer}>
      <h2 className={styles.TitleRegister}>Regístrate</h2>
      <InputField
        {...email}
        icon={"email"}
        label={"Correo Electrónico"}
        name={"email"}
        placeholder={"Ingresa tu email"}
      />

      <InputField
        {...name}
        icon={"user"}
        label={"Nombre"}
        name={"name"}
        placeholder={"Ingresa tu nombre"}
      />

      <InputField
        {...lastName}
        icon={"user"}
        label={"Apellidos"}
        name={"lastName"}
        placeholder={"Ingresa tus apellidos"}
      />

      <InputField
        {...password}
        icon={"password"}
        label={"Contraseña"}
        name={"password"}
        placeholder={"Ingresa tu contraseña"}
      />

      <InputField
        {...confirmPassword}
        icon={"password"}
        label={"Confirmar contraseña"}
        name={"confirmPassword"}
        placeholder={"Vuelve a escribir tu contraseña"}
      />
 
      {/* <label className={styles.CheckBox} htmlFor="terms">
        <input type="checkbox" value="Accepted" name="terms" />
        Acepto los términos y condiciones
      </label> */}

      <Button disabled={disabled} title={"REGISTRARME"} type={"primary"} size={"lg"} width={"Full"} onClick={onSubmit}/>
      <div className={styles.DividerText}>
        <hr/>
        <span href="/">o regístrate con</span>
        <hr/>
      </div>
      <GoogleBtn handleResponse={handleGoogleResponse}></GoogleBtn>
      <h4 hidden={hidden} style={{color: 'white'}}>Ya existe un usuario registrado con ese mail.</h4>
      {/* <Button title={"Regístrate con Google"} type={"secondary"} size={"md"} width={"SemiFull"} icon={"google"} onClick={"Lo que venga de Google"}/> */}
      <span className={styles.OldAccount}>Estoy registrado, <Link to='/login'>Loguearme</Link></span>
    </section>
  );
};

export default RegisterForm;
