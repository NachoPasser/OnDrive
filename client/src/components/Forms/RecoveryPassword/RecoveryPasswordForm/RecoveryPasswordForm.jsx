import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom'
import { useField } from '../../../../hooks/useInputField';
import styles from "./RecoveryPasswordForm.module.css";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import InputField from '../../../Sections/InputField/InputField';
import Button  from '../../../Sections/Button/Button';
import { API_URL } from '../../../../config/enviroment';

const RecoveryPasswordForm = () => {
  const navigate = useHistory();
  const [disabled, setDisabled] = useState(true)
  const [show, setShow] = useState(false);
  const code = useField({type: 'text', field: 'code'})
  const email = useField({type: "text", field: 'email'});
  const handleClose = async(e) => {
    setShow(false)
    // await  axios.post(`${API_URL}/pass/verify-code`,
    // {
    //   email,
    //   code
    // })
    e.preventDefault();
    const prueba = {
      code: code.value,

    }
    console.log('codigo', prueba.code);
  }

  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      email: email.value,
    }
    setShow(true);
    
    try{
      await axios.post(`${API_URL}/pass`, Submit);
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
      <Modal centered={true} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Revisa tu correo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <InputField
                {...email}
                icon={"email"}
                label={"Correo Electrónico"}
                name={"email"}
                placeholder={"Tu email"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <InputField
                {...code}
                icon={"document"}
                label={"Ingresa tu código"}
                name={"code"}
                placeholder={"A23B2C"}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button title={"Verficar"} type={"primary"} size={"sm"} width={"Full"} onClick={handleClose}/>
        </Modal.Footer>
      </Modal>
      <div className={styles.DividerText}>
        <span href="/">¿No tienes un usuario?</span>
      </div>
      <Button title={"REGÍSTRATE"} type={"secondary"} size={"md"} width={"SemiFull"} onClick={registerPage}/>
    </section>
  )
}

export default RecoveryPasswordForm;
