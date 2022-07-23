import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MercadoPago from "./mp.jsx"
import axios from 'axios'
import { getUserById } from '../../redux/actions/getUserById.js'

import { API_URL } from "../../config/enviroment.js";

export default function LoaderMP({ idTrip, price, origin, destination }) {

    const dispatch = useDispatch()

    const user = useSelector(state => state.userById)
    useEffect(() => {
        dispatch(getUserById(localStorage.getItem('token')))
    }, [])
    const [datos, setDatos] = useState("")

    const productos = [{
        title: origin + " - " + destination,
        price
    }]
    console.log(user)
    // let aux;
    // if(Object.keys(user).length){
    //     aux = user.id
    // }


    useEffect(() => {
        const dataTrip = [productos, idTrip, user.user_id]
        axios
            .post(`${API_URL}/mercadopago`, { dataTrip })
            .then((data) => {
                setDatos(data.data)
                console.info('Contenido de data:', data)
            })
            .catch(err => console.error(err))
    }, [user])

    return (
        <div>
            {datos.length !== 0 &&
                <MercadoPago productos={productos} data={datos} />
            }
        </div>
    )
}