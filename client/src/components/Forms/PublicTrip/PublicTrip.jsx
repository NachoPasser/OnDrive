import { useRef, useState } from 'react';
import axios from 'axios';
import InputField from '../../Sections/InputField/InputField';
import { API_URL } from '../../../config/enviroment';
import img1 from '../../../assets/HomeCard/L_134003_salta001.jpg'
import img2 from '../../../assets/HomeCard/Toyota-Corolla-2001.jpg'
import img3 from '../../../assets/HomeCard/WhatsApp-Image-2021-09-06-at-15.14.27-800x400.jpeg'
import './formtrip.css';

import Autocomplete from "react-google-autocomplete";
import Origin from './Origin';
import Destiny from './Destiny';
import Map from '../../Map/map';
// import { Autocomplete } from '@react-google-maps/api';
import { Input, PinInputField } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput } from '../../../redux/actions/changeInput.js';
import MapCalculator from './mapCalculator';

export default function PublicTrip({origin, destination, price, distance}) {
    
    let distanceFloat= distance!==''? parseFloat(distance.split(",").join("")):0
    // console.log(distanceFloat, distance)

    const [orig, setOrig] = useState()
    const [dest, setDest] = useState()
    const [pric, setPric] = useState()
    const [disc, setDisc] = useState(0)
    // console.log(orig, dest, pric, disc)

    let initPoint
    let finishPoint
    if(origin.current && typeof origin.current==="object" && origin.current.value !== orig) {
        initPoint= origin['current']['value']
        setOrig(initPoint)
        // console.log("orig", orig)
    }
    if(destination.current && typeof destination.current==="object" && destination.current.value !== dest) {
        finishPoint= destination['current']['value']
        setDest(finishPoint)
        // console.log("dest", dest)
    }
    if(price !== pric) setPric(price); 
    if(distanceFloat !== disc) setDisc(distanceFloat);


    const [infoTrip, setInfoTrip] = useState({
        capacity: '',
        start_date: '',
        finish_date: '',
    });

    function deshabilitar(){
        if(!infoTrip.capacity|| !infoTrip.start_date|| !infoTrip.finish_date|| !orig|| !dest|| !disc|| !pric) return true
        return false
    }

    const handleChange = (e) => {
        setInfoTrip({
            ...infoTrip,
            [e.target.name]: e.target.value
        })
        console.log({
            ...infoTrip,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit= function(e){
        e.preventDefault()
        //LO COMENTO Y NO LO USO PARA NO CONSUMIR LA API DE GOOGLE QUE TIENE USO LIMITADO MEPA
        // const photos = await axios.get(`${API_URL}/trip/photo/get`, {headers: {
        // 'destination': infoTrip.destination
        // }})

        //Nota: no se puede usar async y await desde el front, al menos no desde acá,
        //sino que hay que crear actions y estados de reducers que se encarguen de realizar
        //llamados usando axios y guardar datos.

        const tripToSave = {
            ...infoTrip, //CAPACIDAD DISPONIBLE Y FECHAS
            orig,
            dest,
            disc,
            pric,
            // initPoint, //ORIGEN
            // finishPoint, //DESTINO
            // price, //PRECIO
            // distance, //DISTANCIA
            // rating: 0,
            // album: [img1, img2, img3]
        }
        console.log("infoTrip desde submit", tripToSave)
        // axios.post(`${API_URL}/trip`,{trip: tripToSave}, {headers: {
        //     Authorization: `Bearer ${window.localStorage.getItem('token')}`
        // }})
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err));
    }

    return (
        <div>
            <form onSubmit= {(e)=>handleSubmit(e)} method="post" action=''>

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
                <InputField //CAMPO AUTOMÁTICO
                    label="Precio (AR$)"
                    name="price"
                    type="number"
                    icon="document"
                    value={price}
                    onChange={handleChange}
                />
                {/* <InputField //ADJUNTADA EN EL MODELO CAR
                    label="Matrícula"
                    name="car"
                    type="text"
                    icon="document"
                    value={infoTrip.car}
                    onChange={handleChange}
                /> */}
                <input id='subm' type="submit" disabled={deshabilitar()}/>
            </form>
        </div>
    )
}