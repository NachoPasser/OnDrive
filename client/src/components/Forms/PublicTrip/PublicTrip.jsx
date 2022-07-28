import { useState } from 'react';
import { useBan } from '../../../hooks/useBan.js'
import axios from 'axios';
import InputField from '../../Sections/InputField/InputField';
import { API_URL } from '../../../config/enviroment';
import { Dates } from './Dates.jsx';
import { useEffect} from "react";
import DtPicker from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/index.css";
// import img1 from '../../../assets/HomeCard/L_134003_salta001.jpg'
// import img2 from '../../../assets/HomeCard/Toyota-Corolla-2001.jpg'
// import img3 from '../../../assets/HomeCard/WhatsApp-Image-2021-09-06-at-15.14.27-800x400.jpeg'
import './formtrip.css';
//pop up
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import style from './PublicTrip.module.css'
import NavBarDrivers from '../../NavBar/navbarDrivers.jsx';


// import Autocomplete from "react-google-autocomplete";
// import Origin from './Origin';
// import Destiny from './Destiny';
// import Map from '../../Map/map';
// // import { Autocomplete } from '@react-google-maps/api';
// import { Input, PinInputField } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeInput } from '../../../redux/actions/changeInput.js';
// import MapCalculator from './mapCalculator';

export default function PublicTrip({origin, destination, price, distance, duration}) {
    
    const { ban, verifying, error } = useBan();
    
    let distanceFloat
    if(distance)distanceFloat= distance!==''? parseFloat(distance.split(",").join("")):0
    // console.log(distanceFloat, distance)
    // console.log(price)
    const [errors,  setErrors] = useState({
        tooLowerStartDate: false,
        tooLowerFinishDate: false,
        wrongCapacity: false,
    })
    // console.log(errors)

    const [orig, setOrig] = useState()
    const [dest, setDest] = useState()
    const [pric, setPric] = useState()
    const [disc, setDisc] = useState(0)
    // console.log(orig, dest, pric, disc)

    let initPoint
    let finishPoint
    if(origin && origin.current && typeof origin.current==="object" && origin.current.value !== orig) {
        initPoint= origin['current']['value']
        setOrig(initPoint)
        // console.log("orig", orig)
    }
    if(destination && destination.current && typeof destination.current==="object" && destination.current.value !== dest) {
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
        // if(!infoTrip.capacity|| !infoTrip.start_date|| !infoTrip.finish_date|| !orig|| !dest|| !disc|| !pric) return true
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
        console.log(infoTrip.dest)
        const photos = axios.get(`${API_URL}/trip/photo/get`, {headers: {
        'destination': dest
        }}).then(resp=>{ 
            console.log(resp.data[1]) 
            console.log(resp.data[2])
            console.log(resp.data[3])
            
            const tripToSave = {
                ...infoTrip, //CAPACIDAD DISPONIBLE Y FECHAS
                origin: orig,
                destination: dest,
                price: pric,
                distance: disc,
                album: [resp.data[1], resp.data[2], resp.data[3]]
            }
            console.log("infoTrip desde submit", tripToSave)

            axios.post(`${API_URL}/trip`,{trip: tripToSave}, {headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }})
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        })
    }

    return (<>
        {
            ban.publish ? <Popup
                trigger={<button className={style.buttonMsg}> Abrir mensaje </button>}
                modal
                nested
            >
                {close => (
                    <div className={style.modal}>
                        <button className={style.close} onClick={close}>
                            &times;
                        </button>
                        <div className={style.header}> ESTAS BANEADO </div>
                        <div className={style.content}>
                            {' '}
                            No podes publicar viajes
                        </div>
                        <div className={style.actions}>
                            <Popup
                                position="top center"
                                nested
                            >
                            </Popup>
                            <button
                                className={style.buttonClose}
                                onClick={() => {
                                    console.log('modal closed ');
                                    close();
                                }}
                            >
                                cerrar mensaje
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
                :
        <div>
        {/* <NavBarDrivers publicar={false} passenger={false}/> */}
            <form onSubmit= {(e)=>handleSubmit(e)} method="post" action=''>
                
                <Dates duration={duration}/>

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
                />
                {/* <InputField //ADJUNTADA EN EL MODELO CAR
                    label="Hora"
                    name="car"
                    type="text"
                    icon='document'
                    value={infoTrip.time}
                    onChange={handleChange}
                /> */}
                <input id='subm' type="submit" disabled={deshabilitar()}/>
            </form>
        </div>
        }
        </>
    )
}