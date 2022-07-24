import axios from "axios";
import { useState } from "react";
import InputField from "../../Sections/InputField/InputField";
import { API_URL } from "../../../config/enviroment";

export default function UserToDriver(){
    const [driver, setDriver] = useState({
        license: "",
        driving_permit: "",
        dni: "",
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(driver);
        await axios.post(`${API_URL}/auth/register-driver`, {driver}, {headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }})
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response));
    }
    const handleChange = (e) => {
        setDriver({
            ...driver,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <h1>Registrar Conductor</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Licencia"
                    name="license"
                    type="text"
                    value={driver.license}
                    onChange={handleChange}
                />
                <InputField
                    label="Permiso de conducir"
                    name="driving_permit"
                    type="text"
                    value={driver.driving_permit}
                    onChange={handleChange}
                />
                <InputField
                    label="DNI"
                    name="dni"
                    type="text"
                    value={driver.dni}
                    onChange={handleChange}
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}   