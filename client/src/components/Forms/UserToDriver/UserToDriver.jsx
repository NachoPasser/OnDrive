import axios from "axios";
import { useState, useEffect } from "react";
import InputField from "../../Sections/InputField/InputField";
import { useHistory } from 'react-router-dom';
import { API_URL } from "../../../config/enviroment";
import { useField } from "../../../hooks/useInputField";
import Button from '../../Sections/Button/Button';
import styles from './UserToDriver.module.css'

export default function UserToDriver(){
    const history = useHistory()
    const [disable, setDisable] = useState(true)
    const license = useField({type: "text", field: 'license'});
    const car_insurance = useField({type: "text", field: 'car_insurance'});
    const DNI = useField({type: 'text', field: 'DNI'})

    const handleSubmit = (e) => {
        e.preventDefault();
        const Submit = {
            license: license.value,
            car_insurance: car_insurance.value,
            DNI: DNI.value
          }
        console.log(Submit)
        axios.post(`${API_URL}/auth/register-driver`, {driver: Submit}, {headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }})
        .then(res => {
            console.log(res.data)
            history.push('/addCar')
        })
        .catch(err => console.log(err.response));
    }

    useEffect(() => {
        let form = [license, car_insurance, DNI]
        let disable = false
        
        for(const field of form){
        if(!field.value) disable = true
        if(field.error) disable = true
        }
        
        setDisable(disable)
    
      }, [license, car_insurance, DNI])

    return (
        <section className={styles.LoginFormContainer}>
            <h2 className={styles.TitleLogin} >Registrar Conductor</h2>
                <InputField
                    {...license}
                    label="Licencia"
                    name="license"
                    placeholder={'Ingresa tu numero de licencia'}
                />
                <InputField
                    {...car_insurance}
                    label="Seguro del auto"
                    name="car_insurance"
                    placeholder={'Ingresa el nombre de la compañia'}
                />
                <InputField
                    {...DNI}
                    label="DNI"
                    name="DNI"
                    placeholder={'Ingresa tu DNI'}
                />
                <Button disabled={disable} title={"CONVERTIRTE EN CONDUCTOR"} type={"primary"} size={"lg"} width={"Full"} onClick={handleSubmit}/>
        </section>
    )
}   