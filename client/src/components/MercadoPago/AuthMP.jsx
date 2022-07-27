import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "../../redux/actions/getUserById";
import s from '../MercadoPago/mp.module.css'
import NavBar from "../NavBar/navbarDrivers";

export default function AuthMP({}){

    function goToA(){
        document.getElementById("toAuth").click()
    }
    const dispatch = useDispatch()

    const user = useSelector(state => state.userById)
    useEffect(() => {
        dispatch(getUserById(localStorage.getItem('token')))
    }, [])

    // const dataTrip = [productos, idTrip, user.user_id]
    if(Object.keys(user).length) console.log("user:", user, "user_id:", user.user_id)

    let pathToGetPermission 
    if (user && user.user_id){
        pathToGetPermission= `https://auth.mercadopago.com/authorization?client_id=8074988940290506&response_type=code&platform_id=mp&state=${user.user_id}&redirect_uri=http://localhost:3001/mercadopago/reception`
    }

    return (
        <div>
            <NavBar/>
            <p className={s.p}>Para recibir los pagos de otros usuarios cuando viajen con vos,
                es necesario que autentiques tu cuenta de Mercado Pago.
            </p>
            <p className={s.p}> Hacé clic en el botón de abajo para autenticar.
            </p>
            {/* <Link href="https://auth.mercadopago.com/authorization?client_id=8074988940290506&response_type=code&platform_id=mp&state=011&redirect_uri=http://localhost:3001/mercadopago/reception">
                <button>
                    Ir a autenticar mi cuenta de Mercado Pago
                </button>
            </Link> */}{ Object.keys(user).length && !user["driver"]["access_token"] && user.user_id &&
            <button onClick={goToA}>
                <a id="toAuth" href={pathToGetPermission} target="_blank"> 
                    Autenticar Mercado Pago 
                </a>
            </button>}
            <br/>
            { Object.keys(user).length && user["driver"]["access_token"] && user["driver"]["refresh_token"] && user.user_id?
                <p style={{"color": 'yellowgreen'}}>No hace falta que autentiques, ya lo hiciste.</p>
                : <p>Autenticate, aún no lo hiciste.</p>
            }
            <br/>
            <Link to='/home-drivers'>
                <button>
                    {'<- Volver'}
                </button>
            </Link>
        </div>
    )
}