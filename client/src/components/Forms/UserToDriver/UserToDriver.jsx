import axios from "axios";
import { useState, useEffect } from "react";
import InputField from "../../Sections/InputField/InputField";
import { useHistory } from 'react-router-dom';
import { API_URL } from "../../../config/enviroment";
import { useField } from "../../../hooks/useInputField";
import Button from '../../Sections/Button/Button';
import styles from './UserToDriver.module.css'
import auto from '../../../assets/Forms/auto-amarillo.png'
import logo from '../../../assets/Logo/onDrive-logo.png'

export default function UserToDriver() {
    const history = useHistory()
    const [disable, setDisable] = useState(true)
    const license = useField({ type: "text", field: 'license' });
    const car_insurance = useField({ type: "text", field: 'car_insurance' });
    const DNI = useField({ type: 'text', field: 'DNI' })
    const phone_number = useField({ type: 'text', field: 'phone_number' })

    const handleSubmit = (e) => {
        e.preventDefault();
        const Submit = {
            license: license.value,
            car_insurance: car_insurance.value,
            DNI: DNI.value,
            phone_number: phone_number.value
        }
        console.log(Submit)
        axios.post(`${API_URL}/auth/register-driver`, { driver: Submit }, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res.data)
                history.push('/addCar')
            })
            .catch(err => console.log(err.response));
    }

    useEffect(() => {
        let form = [license, car_insurance, DNI, phone_number]
        let disable = false

        for (const field of form) {
            if (!field.value) disable = true
            if (field.error) disable = true
        }

        setDisable(disable)

    }, [license, car_insurance, DNI, phone_number])

    return (
        <div className={styles.containerAll}>
            <section className={styles.ImageContainer}>
                <img id={styles.logo} src={logo} alt=""></img>
                <br></br>
                <img id={styles.auto} src={auto} alt=""></img>
                <br></br>
                <p className={styles.Text}>
                    Conviértete en conductor para acceder a todos los beneficios que brinda On Drive. Asi, podras compartir los costos de tus viajes y te será mucho mas rentable transportarte!
                </p>
            </section>
            <section className={styles.LoginFormContainer}>
                <h2 className={styles.TitleLogin} >Regístrate como conductor</h2>
                <InputField
                    {...license}
                    label="N° de Licencia Nacional de Conducir"
                    name="license"
                    placeholder={'Ingresa tu numero de licencia'}
                />
                <InputField
                    {...car_insurance}
                    label="Compañia de seguros"
                    name="car_insurance"
                    placeholder={'Ingresa el nombre de la compañia'}
                />
                <InputField
                    {...DNI}
                    label="DNI"
                    name="DNI"
                    placeholder={'Ingresa tu DNI'}
                />
                <InputField
                    {...phone_number}
                    label="Teléfono de contacto"
                    name="phone_number"
                    placeholder={'Ingresa tu numero de celular'}
                />
                <Button disabled={disable} title={"CONVERTIRTE EN CONDUCTOR"} type={"primary"} size={"lg"} width={"Full"} onClick={handleSubmit} />
            </section>
        </div>
    )
}