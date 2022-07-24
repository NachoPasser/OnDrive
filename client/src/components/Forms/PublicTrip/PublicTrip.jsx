import { useState } from 'react';
import axios from 'axios';
import InputField from '../../Sections/InputField/InputField';
import { API_URL } from '../../../config/enviroment';


export default function PublicTrip() {
    const [infoTrip, setInfoTrip] = useState({
        origin: '',
        destination: '',
        start_date: '',
        finish_date: '',
        capacity: '',
        car: '',
        price: '',
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/trip/${window.localStorage.getItem('token')}`, infoTrip)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }
    const handleChange = (e) => {
        setInfoTrip({
            ...infoTrip,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <h1>Publicar viaje</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Origen"
                    name="origin"
                    type="text"
                    icon="document"
                    value={infoTrip.origin}
                    onChange={handleChange}
                />
                <InputField
                    label="Destino"
                    name="destination"
                    icon="document"
                    type="text"
                    value={infoTrip.destination}
                    onChange={handleChange}
                />
                <InputField
                    label="Fecha de inicio"
                    name="start_date"
                    type="date"
                    icon="document"
                    value={infoTrip.start_date}
                    onChange={handleChange}
                />
                <InputField
                    label="Fecha de Llegada"
                    name="finish_date"
                    type="date"
                    icon="document"
                    value={infoTrip.finish_date}
                    onChange={handleChange}
                />
                <InputField
                    label="Capacidad"
                    name="capacity"
                    type="number"
                    icon="document"
                    value={infoTrip.capacity}
                    onChange={handleChange}
                />
                <InputField
                    label="Precio"
                    name="price"
                    type="number"
                    icon="document"
                    value={infoTrip.price}
                    onChange={handleChange}
                />
                <InputField
                    label="Matrícula"
                    name="car"
                    type="text"
                    icon="document"
                    value={infoTrip.car}
                    onChange={handleChange}
                />
                <button type="submit">Publicar</button>
            </form>
        </div>
    )
}