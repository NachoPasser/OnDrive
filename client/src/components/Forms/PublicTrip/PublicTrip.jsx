import { useState } from 'react';
import { useBan } from '../../../hooks/useBan.js'
import axios from 'axios';
import { API_URL } from '../../../config/enviroment.js';
import { useEffect} from "react";
//componentes
import { Dates } from './Dates.jsx';
import InputField from '../../Sections/InputField/InputField';
import Button from '../../Sections/Button/Button.jsx';
//imagenes para no gasta Google
import img1 from '../../../assets/HomeCard/L_134003_salta001.jpg'
import img2 from '../../../assets/HomeCard/Toyota-Corolla-2001.jpg'
import img3 from '../../../assets/HomeCard/WhatsApp-Image-2021-09-06-at-15.14.27-800x400.jpeg'
//estilos
import "react-calendar-datetime-picker/dist/index.css";
import './formtrip.css';
import style from './PublicTrip.module.css'
//pop up
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByToken } from '../../../redux/actions/getUserByToken.js';
import { getCarById, GET_CAR_BY_ID } from '../../../redux/actions/getCarById.js';


const formatDate = (date) => {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString()
}

function cleanString(input) {
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
}

export default function PublicTrip({origin, destination, price, distance, duration, errors, setErrors}) {
    
    const dispatch = useDispatch()
    const { ban, verifying, error } = useBan();
    let distanceFloat= distance!==''? parseFloat(distance.split(",").join("")):0

    const [orig, setOrig] = useState('')
    const [dest, setDest] = useState('')
    const [pric, setPric] = useState(0)
    const [disc, setDisc] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [capacity, setCapacity] = useState(1)
    const [carSelected, setCar] = useState('Default')
    const [dateStart, setDateStart] = useState(null);
    const [dateFinish, setDateFinish] = useState('')
    const user = useSelector(state => state.userById)
    const car = useSelector(state => state.carById)

    if(!price && pric) setPric(0)

    let initPoint
    let finishPoint
    if (origin && origin.current && typeof origin.current === "object" && origin.current.value !== orig) {
        initPoint = origin['current']['value']
        setOrig(initPoint)
    }
    if (destination && destination.current && typeof destination.current === "object" && destination.current.value !== dest) {
        finishPoint = destination['current']['value']
        setDest(finishPoint)
    }

    if(price && price !== pric) {
        setErrors({...errors, price: ''})
        setPric(price)
    }
    
    if(distanceFloat !== disc) setDisc(distanceFloat);
        
    useEffect(() => {
        dispatch(getUserByToken(window.localStorage.getItem('token')))
    }, [])

    useEffect(() => {
        let disabled = false
        // let form = [orig, dest, pric, capacity]
        for (const prop of Object.keys(errors)) {
            if(errors[prop]) disabled = true
            if(!prop) disabled = true
        }
        setDisabled(disabled)
    }, [errors])
    
    if(capacity && price) price = price / capacity
    
    const handleCapacity = (e) => {
        let num = Number(e.target.value)
        if(!isNaN(num) && num >= 1 && num <= car.capacity){
            setCapacity(num)
            setErrors({...errors, capacity: ''})
        }
        
        if(!e.target.value){
            setCapacity('')
            setErrors({...errors, capacity: 'Numero de pasajeros requerido.'})
        }
    }

    const handleSelect = (e) => {
        let car_id = e.target.value
        dispatch(getCarById(car_id))
        setCar(car_id)
        setErrors({...errors, car: ''})
    }

    useEffect(() => { //para eliminar el auto del store
        return () => {
            dispatch({type: GET_CAR_BY_ID, payload: {}})
          };
    }, [])

    const handleSubmit= function(e){
        e.preventDefault()
        // //LO COMENTO Y NO LO USO PARA NO CONSUMIR LA API DE GOOGLE QUE TIENE USO LIMITADO MEPA
        // console.log(infoTrip.dest)
        // console.log(cleanString(dest), typeof dest)
        const photos = axios.get(`${API_URL}/trip/photo/get`, {headers: {
        'destination': cleanString(dest)
        }}).then(resp=>{ 
            // console.log(resp.data)
            // console.log(resp.data[1]) 
            // console.log(resp.data[2])
            // console.log(resp.data[3])
            // console.log(dateStart)
            
            const tripToSave = {
                origin: orig,
                destination: dest,
                price: pric,
                distance: disc,
                // album: [img1, img2, img3],
                album: [resp.data[0], resp.data[1], resp.data[2]],
                capacity,
                start_date: (dateStart),
                finish_date: (dateFinish)
            }

            let car_id= user.driver.cars[0].car_id
            // console.log('the car_id', car_id)

            axios.post(`${API_URL}/trip`,{trip: tripToSave, car_id}, {headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }})
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
            // console.log("infoTrip desde submit", tripToSave)
            // console.log(car_id, window.localStorage.getItem('token'))

        }).catch(e=> console.log(e))
    }

    // console.log(car)

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
            <form onSubmit= {(e)=>handleSubmit(e)} /*method="post" action=''*/>
                
                <Dates 
                errors={errors} 
                setErrors={setErrors}
                duration={duration} 
                dateStart={dateStart}
                setDateStart={setDateStart}
                dateFinish={dateFinish}
                setDateFinish={setDateFinish}/>
                
                   
                <div>
                    <select style={{height: '50px'}} onChange={(e) => handleSelect(e)} value={carSelected}>
                        <option selected disabled defaultValue="Default">Auto</option>
                        {
                            user.hasOwnProperty('driver') && user.driver.cars.map(c => 
                                <option key={c.model} name={c.model} defaultValue={c.car_id}>
                                    {c.model}
                                </option>)
                        }
                    </select>
                    {errors.car ? <span className={style.ErrorInputField}>{errors.car}</span> : null}
                </div>
                    
                {
                    // car.hasOwnProperty('capacity')&&
                    <InputField
                        style={{'height':'48px','borderRadius':'7px','color':'rgb:(40,40,40,)','backgroundColor':'rgb(230,230,230)'}}
                        label="Capacidad"
                        name="capacity"
                        type="number"
                        icon="document"
                        placeholder='Introduce el numero de pasajeros'
                        error={errors.capacity}
                        value={capacity}
                        onChange={handleCapacity}
                    />
                }
                <InputField //CAMPO AUTOMÁTICO
                    label="Precio (AR$)"
                    name="price"
                    readOnly={true}
                    type="number"
                    icon="document"
                    value={price}
                />
                {errors.price ? <span className={style.ErrorInputField}>{errors.price}</span> : null}
                {/* <InputField //ADJUNTADA EN EL MODELO CAR
                    label="Hora"
                    name="car"
                    type="text"
                    icon='document'
                    value={infoTrip.time}
                    onChange={handleChange}
                /> */}
                <Button disabled={false} title={"PUBLICAR"} type={"primary"} size={"lg"} width={"Full"}/>
                {/* <input id='subm' type="submit"/> */}
            </form>
        </div>
        }
    </>
    )
}