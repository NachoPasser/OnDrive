import React from "react";
import InputField from "../../sections/InputField/InputField";
import Button from "../../sections/Button/Button";
import { useHistory } from "react-router-dom";
import { useField } from '../../hooks/useInputField';
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const history = useHistory()
  const email = useField({type: "text"});
  const name = useField({type: "text"});
  const lastName = useField({type: "text"});
  const password = useField({type: "password"});
  const confirmPassword = useField({type: "password"});

  async function onSubmit(e){
    /* Function Submit del Botón, obtenemos los values de nuestros inputs y los añadimos al objeto */
    e.preventDefault();
    const Submit = {
      email: email.value,
      name: name.value,
      lastName: lastName.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    }

    await axios.post('http://localhost:3001/auth/register', Submit)
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
      <Button title={"Regístrate con Google"} type={"secondary"} size={"md"} width={"SemiFull"} icon={"google"} onClick={"Lo que venga de Google"}/>

    </section>
  );
};

export default RegisterForm;
