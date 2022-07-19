import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useField } from '../../../../hooks/useInputField';
import styles from "./RecoveryPasswordForm.module.css";
import axios from 'axios'
import InputField from '../../../Sections/InputField/InputField';
import Button from '../../../Sections/Button/Button';
import { API_URL } from '../../../../config/enviroment';

const RecoveryPasswordForm = () => {
  const navigate = useHistory();
  const [disabled, setDisabled] = useState(true)
  const email = useField({type: "text", field: 'email'});
  
  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      email: email.value,
    }
    
    try{
      await axios.post(`${API_URL}/pass`, Submit);
      navigate.push("/login");
    } catch(e){
      email.setError(e.response.data.error)
    }
  }


  const registerPage = () => {
    navigate.push("/register");
  }

  useEffect(() => {
    if(email.value && !email.error){
      setDisabled(false)
    } else{
      setDisabled(true)
    }
  }, [email])

  return (
    <section className={styles.RecoveryFormContainer}>
      <h2 className={styles.TitleRecovery}>Recuperar Contraseña</h2>
      <InputField
        {...email}
        icon={"email"}
        label={"Correo Electrónico"}
        name={"email"}
        placeholder={"Ingresa tu email"}
      />
      <span className={styles.BackHome}>Quiero <Link to='/login'>volver al inicio</Link></span>
      <Button disabled={disabled} title={"ENVIAR"} type={"primary"} size={"lg"} width={"Full"} onClick={onSubmit}/>
      <div className={styles.DividerText}>
        <span href="/">¿No tienes un usuario?</span>
      </div>
      <Button title={"REGÍSTRATE"} type={"secondary"} size={"md"} width={"SemiFull"} onClick={registerPage}/>
    </section>
  )
}

export default RecoveryPasswordForm;