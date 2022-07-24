import React, { useEffect, useState } from 'react';
import styles from "./NewPasswordForm.module.css";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {API_URL} from '../../../../config/enviroment';
import InputField from '../../../Sections/InputField/InputField';
import Button from '../../../Sections/Button/Button';
import { useHistory } from 'react-router-dom';
import { useField } from '../../../../hooks/useInputField';
import vectorPassword from "../../../../assets/NewPassword/NewPassword.png";

const NewPasswordForm = () => {
  const navigate = useHistory();
  const password = useField({type: "password", field: 'password'});
  const confirmPassword = useField({type: "password", field:'confirm_password'});
  const [disabled, setDisable] = useState(true)
  const [show, setShow] = useState(false);
  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      password: password.value,
      confirmPassword: confirmPassword.value 
    }
    setShow(true);
    await axios.post(`${API_URL}/pass/change/${window.localStorage.getItem('token')}`, Submit);
  }
  const homePage = () => {
    navigate.push("/home");
  }

  useEffect(() => {
    let disable = false

    if(!password.value || !confirmPassword.value || password.error || confirmPassword.error){
      disable = true
    } 

    if(password.value !== confirmPassword.value){
      confirmPassword.setError('La contraseña actual no es igual a la ingresada anteriormente.') 
      disable = true
    }
    
    setDisable(disable)

  }, [password, confirmPassword])
  
  return (
    
    <section className={styles.NewPasswordFormContainer}>
      <h2 className={styles.TitleNewPassword}>Cambiar Contraseña</h2>
      <img className={styles.NewPasswordImage} src={vectorPassword} alt="vector-new-password" />
      <InputField
        {...password}
        icon={"password"}
        label={"Nueva Contraseña"}
        name={"password"}
        placeholder={"Ingresa tu nueva contraseña"}
      />
      <InputField
        {...confirmPassword}
        icon={"password"}
        label={"Confirmar Nueva Contraseña"}
        name={"password"}
        placeholder={"Vuelve a escribir tu nueva contraseña"}
      />
      <Modal contentClassName={styles.modalBody} centered={true} show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Contraseña cambiada!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tu contraseña se ha modificado</p>
        </Modal.Body>
        <Modal.Footer>
          <Button title={"Volver"} type={"primary"} size={"lg"} width={"Full"} onClick={homePage}/>
        </Modal.Footer>
      </Modal>
      <Button disabled={disabled} title={"CONFIRMAR"} type={"primary"} size={"lg"} width={"Full"} onClick={(e)=>onSubmit(e)}/>

    </section>
  )
}

export default NewPasswordForm;