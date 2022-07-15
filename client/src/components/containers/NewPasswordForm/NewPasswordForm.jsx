import React from 'react';
import styles from "./NewPasswordForm.module.css";
import axios from 'axios';
import {API_URL} from '../../../config/enviroment';
import InputField from '../../sections/InputField/InputField';
import Button from '../../sections/Button/Button';
import { useHistory } from 'react-router-dom';
import { useField } from '../../hooks/useInputField';
import vectorPassword from "../../../assets/NewPassword/NewPassword.png";

const NewPasswordForm = ({UserEmail}) => {
  const navigate = useHistory();
  const password = useField({type: "password"});
  const confirmPassword = useField({type: "password"});
  
  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      password: password.value,
      confirmPassword: confirmPassword.value 
    }
    await axios.post(`${API_URL}/pass/change/${window.localStorage.getItem('token')}`, Submit);
    navigate.push('/home');
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