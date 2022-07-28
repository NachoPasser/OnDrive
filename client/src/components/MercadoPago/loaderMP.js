import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MercadoPago from "./mp.jsx"
import axios from 'axios'
import { getUserById } from '../../redux/actions/getUserById.js'

import { API_URL } from "../../config/enviroment.js";

export default function LoaderMP({ user, idTrip, price, origin, destination, start, finish, capacity }) {

    // console.log(user)
    //console.log(origin, destination)
    let startDate = new Date(start)
    let finishDate = new Date(finish)

    let s = startDate.toLocaleDateString()
    let f = finishDate.toLocaleDateString()

    const [datos, setDatos] = useState("")
    const [comprobant, setComprobant] = useState(false)

    const productos = [{
        title: origin + " - " + destination,
        price
    }]
    // let aux;
    // if(Object.keys(user).length){
    //     aux = user.id
    // }
    let user_id = user.user_id

    // useEffect(() => {
    if (!comprobant) {
        const dataTrip = [productos, idTrip, user_id]
        axios
            .post(`${API_URL}/mercadopago`, { dataTrip })
            .then((data) => {
                setDatos(data.data)
                //console.info('Contenido de data:', data)
            })
            .catch(err => console.error(err))
        setComprobant(true)
    }
    // }, [])

    return (
        <div>
            {datos.length !== 0 &&
                <MercadoPago productos={productos} data={datos} />
            }
        </div>
    )
}