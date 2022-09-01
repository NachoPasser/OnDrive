import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserByToken } from "../../redux/actions/getUserByToken";
import s from '../MercadoPago/mp.module.css'
import NavBarDrivers from "../NavBar/navbarDrivers";

export default function AuthMP({ }) {

    // function goToA() {
    //     document.getElementById("toAuth").click()
    // }
    const dispatch = useDispatch()

    const user = useSelector(state => state.userById)
    useEffect(() => {
        dispatch(getUserByToken(localStorage.getItem('token')))
    }, [])

    // const dataTrip = [productos, idTrip, user.user_id]
    if (Object.keys(user).length) console.log("user:", user, "user_id:", user.user_id)

    let pathToGetPermission
    if (user && user.user_id) {
        pathToGetPermission = `https://auth.mercadopago.com/authorization?client_id=8074988940290506&response_type=code&platform_id=mp&state=${user.user_id}&redirect_uri=http://localhost:3001/mercadopago/reception`
    }

    // const [authMP, setAuthMP] = useState(false)
    const handleMP = (e) => {
        e.preventDefault();
        window.location.href = pathToGetPermission
    }

    return (
        <div>
            <button className={s.toAuth} onClick={(e) => handleMP(e)}>Autenticar</button>

            {/* <div>
                <div>
            {Object.keys(user).length && !user["driver"]["access_token"] && user.user_id &&
                        <button className={s.toAuth} onClick={(e) => handleMP(e)}>Autenticar Mercado Pago</button>
                    }     
                    <br />
                    {Object.keys(user).length && user["driver"]["access_token"] && user["driver"]["refresh_token"] && user.user_id ?
                        <p style={{ "color": 'yellowgreen' }}>No hace falta que autentiques, ya lo hiciste.</p>
                        : <p id={s.noAuth}>Autenticate, aún no lo hiciste.</p>
                    }
                    <br />
                </div>
            </div> */}
        </div>
    )
}