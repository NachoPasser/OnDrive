import React from "react";
import InputField from "../../../Sections/InputField/InputField";
import Button from "../../../Sections/Button/Button";
import { useHistory } from "react-router-dom";
import { useField } from '../../../../hooks/useInputField';
import GoogleBtn from "../../../Sections/GoogleBtn/GoogleBtn";
import jwtDecode from 'jwt-decode'
import styles from "./RegisterForm.module.css";
import axios from 'axios'
import {API_URL} from "../../../../config/enviroment";

const RegisterForm = () => {
  const history = useHistory()
  const email = useField({type: "text"});
  const name = useField({type: "text"});
  const lastName = useField({type: "text"});
  const password = useField({type: "password"});
  const confirmPassword = useField({type: "password"});
  
  async function handleGoogleResponse(response){
    const {email, given_name: name, family_name: last_name} = jwtDecode(response.credential)
    await axios.post(`${API_URL}/auth/register`, {email, name, last_name})
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
      name: name.value,
      last_name: lastName.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    }

    await axios.post(`${API_URL}/auth/register`, Submit)
    .then(datos => {
      window.localStorage.setItem('token', datos.data.token)
    })
    .catch(/TO DO/)
    history.push('/home')
  }

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
        label={"Nombres"}
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
        label={"Password"}
        name={"password"}
        placeholder={"Ingresa tu password"}
      />

      <InputField
        {...confirmPassword}
        icon={"password"}
        label={"Confirmar Password"}
        name={"confirmPassword"}
        placeholder={"Vuelve a escribir tu password"}
      />
 
      <label className={styles.CheckBox} htmlFor="terms">
        <input type="checkbox" value="Accepted" name="terms" />
        Acepto los términos y condiciones
      </label>

      <Button title={"REGISTRARME"} type={"primary"} size={"lg"} width={"Full"} onClick={onSubmit}/>
      <div className={styles.DividerText}>
        <hr/>
        <span href="/">o regístrate con</span>
        <hr/>
      </div>
      <GoogleBtn handleResponse={handleGoogleResponse}></GoogleBtn>
      {/* <Button title={"Regístrate con Google"} type={"secondary"} size={"md"} width={"SemiFull"} icon={"google"} onClick={"Lo que venga de Google"}/> */}

    </section>
  );
};

export default RegisterForm;