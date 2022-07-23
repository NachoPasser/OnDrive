import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { useField } from "../../../../hooks/useInputField";
import styles from "./RecoveryPasswordForm.module.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import InputField from "../../../Sections/InputField/InputField";
import Button from "../../../Sections/Button/Button";
import { API_URL } from "../../../../config/enviroment";

const RecoveryPasswordForm = () => {
  const navigate = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const code = useField({ type: "text", field: "code" });
  const email = useField({ type: "text", field: "email" });

  //redirects
  const registerPage = () => {
    navigate.push("/register");
  };

  //verifica que el codigo ingresado sea valido y lo redirige a /new-password
  const handleVerifyCode = async () => {
    try {
      let res = await axios.post(`${API_URL}/pass/verify-code`, {
        email: email.value,
        code: code.value,
      });

      localStorage.setItem("token", res.data.token); //guardar token
      setShow(false);
      navigate.push("/new-password"); //enviar al usuario a cambiar su pass
    } catch (e) {
      let error = e.response.data.error;
      code.setError(error);
    }
  };

  //envia el email al usuario
  const handleSendEmail = async () => {
    try {
      await axios.post(`${API_URL}/pass`, {
        email: email.value,
      });
      setShow(true);
    } catch (e) {
      let error = e.response.data.error;
      email.setError(error);
    }
  };

  useEffect(() => {
    if (email.value && !email.error) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  return (
    <section className={styles.RecoveryFormContainer}>
      <h2 className={styles.TitleRecovery}>Recuperar Contraseña</h2>
      <InputField
        {...email}
        icon={"email"}
        label={"Correo Electrónico"}
        name={"email"}
        placeholder={"Ingresa tu email"}
        onChange={email.onChange}
      />
      <span className={styles.BackHome}>
        Quiero <Link to="/login">volver al inicio</Link>
      </span>
      <Button
        disabled={disabled}
        title={"ENVIAR"}
        type={"primary"}
        size={"lg"}
        width={"Full"}
        onClick={handleSendEmail}
      />

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Revisa tu correo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <InputField
                {...code}
                icon={"document"}
                label={"Ingresa tu código"}
                name={"code"}
                placeholder={"A23B2C"}
                onChange={code.onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            title={"Verficar"}
            type={"primary"}
            size={"sm"}
            width={"Full"}
            onClick={handleVerifyCode}
          />
        </Modal.Footer>
      </Modal>

      <div className={styles.DividerText}>
        <span href="/">¿No tienes un usuario?</span>
      </div>
      <Button
        title={"REGÍSTRATE"}
        type={"secondary"}
        size={"md"}
        width={"SemiFull"}
        onClick={registerPage}
      />
    </section>
  );
};

export default RecoveryPasswordForm;
