import { useState } from 'react';
import axios from 'axios';
import InputField from '../../Sections/InputField/InputField';
import { API_URL } from '../../../config/enviroment';
import img1 from '../../../assets/HomeCard/L_134003_salta001.jpg'
import img2 from '../../../assets/HomeCard/Toyota-Corolla-2001.jpg'
import img3 from '../../../assets/HomeCard/WhatsApp-Image-2021-09-06-at-15.14.27-800x400.jpeg'

export default function PublicTrip() {
    const [infoTrip, setInfoTrip] = useState({
        capacity: '',
        origin: '',
        destination: '',
        start_date: '',
        finish_date: '',
        price: '', //ESTO NO LO PONE EL USUARIO, LO CALCULAMOS COMO HACEMOS CON EL MAPA, HAY QUE AGREGAR ESO
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(infoTrip)
        //LO COMENTO Y NO LO USO PARA NO CONSUMIR LA API DE GOOGLE QUE TIENE USO LIMITADO MEPA
        // const photos = await axios.get(`${API_URL}/trip/photo/get`, {headers: {
        // 'destination': infoTrip.destination
        // }})
        const tripToSave = {
            ...infoTrip,
            rating: 0,
            price: parseInt(infoTrip.price),
            capacity: parseInt(infoTrip.capacity),
            distance: 300, //ESTO DEBERIA SER CALCULADO CON EL MAPA, COMO HACEMOS EN EL HOME
            album: [img1, img2, img3]
        } 
        axios.post(`${API_URL}/trip`,{trip: tripToSave}, {headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }})
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