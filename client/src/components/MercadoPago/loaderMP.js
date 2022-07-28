import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MercadoPago from "./mp.jsx"
import axios from 'axios'
import { getUserById } from '../../redux/actions/getUserById.js'
import s from './mp.module.css'

import { API_URL } from "../../config/enviroment.js";

export default function LoaderMP({ driverId, user, idTrip, price, origin, destination, start, finish, capacity, driver }) {

    // console.log(user)
    //console.log(origin, destination)
    let startDate = new Date(start)
    let finishDate = new Date(finish)

    let s = startDate.toLocaleDateString()
    let f = finishDate.toLocaleDateString()

    // const [seats, setSeats] = useState()
    const [datos, setDatos] = useState("")
    const [comprobant, setComprobant] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [cantSelect, setCantSelect] = useState(1)

    const productos = [{
        title: origin + " - " + destination,
        price: parseFloat(price.toFixed(2) * cantSelect)
    }]

    let user_id = user.user_id

    // useEffect(() => 
    //CREAR PREFERENCIA
    if (!comprobant && confirm) {
        const dataTrip = [productos, idTrip, user_id, driverId, cantSelect]
        console.log(dataTrip)
        axios
            .post(`${API_URL}/mercadopago`, { dataTrip })
            .then((data) => {
                setDatos(data.data)
                //console.info('Contenido de data:', data)
            })
            .catch(err => console.error(err))
        setComprobant(true)
        setConfirm(false)
    }

    function cash() {
        setConfirm(true)
    }
    // }, [])

    const handleChange = (e) => {
        setCantSelect(e.target.value)
    }

    // function desable() {
    //     if (confirm) return true
    //     return false
    // }

    return (<div style={{ 'color': 'orange' }}>
        <br></br>
        <br></br>{!confirm && <>
            <div style={{ 'color': 'wheat' }}>
                <div>{cantSelect
                    ? '$' + parseFloat(price.toFixed(2) * cantSelect)
                    : '$' + parseFloat(price.toFixed(2))
                }</div>
                <div>
                    <div>
                        <label style={{ 'marginRight': '20px', 'width': '200px' }}>¿Cuantas butacas desea reservar?</label>
                    </div>
                    <input type='number' defaultValue={1} min={1} max={capacity} onChange={e => handleChange(e)}
                    ></input>
                </div>
                <button onClick={cash} style={{ 'width': '200px', 'height': '30px' }} >
                    Confirmar y pagar
                </button>
            </div>
        </>}

        <h4>Checkout</h4>
        <div className={s.gridContainer} >
            {productos.map((producto, i) => {
                return (
                    <div className={s.products} key={i}>
                        <ul className={s.ul} >
                            <li>{producto.title}</li>
                        </ul>
                    </div>
                )
            })}
        </div>

        {datos.length !== 0 &&
            <>{parseFloat(price.toFixed(2) * cantSelect)}
                <MercadoPago data={datos} />
            </>}
    </div>)
}
