import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "../../redux/actions/getUserById";
import s from '../MercadoPago/mp.module.css'
import NavBarDrivers from "../NavBar/navbarDrivers";

export default function AuthMP({ }) {

    // function goToA() {
    //     document.getElementById("toAuth").click()
    // }
    const dispatch = useDispatch()

    const user = useSelector(state => state.userById)
    useEffect(() => {
        dispatch(getUserById(localStorage.getItem('token')))
    }, [])

    // const dataTrip = [productos, idTrip, user.user_id]
    if (Object.keys(user).length) console.log("user:", user, "user_id:", user.user_id)

    let pathToGetPermission
    if (user && user.user_id) {
        pathToGetPermission = `https://auth.mercadopago.com/authorization?client_id=8074988940290506&response_type=code&platform_id=mp&state=${user.user_id}&redirect_uri=http://localhost:3001/mercadopago/reception`
    }

    const [authMP, setAuthMP] = useState(false)
    const handleMP = (e) => {
        e.preventDefault();
        window.location.href = pathToGetPermission
    }

    return (
        <div className={s.containerAuth}>
            <NavBarDrivers authMP={authMP} setAuthMP={setAuthMP} />
            <div className={s.info}>
                <div className={s.cajita}>
                    <p className={s.p}>Para recibir los pagos de otros usuarios cuando viajen con vos,
                        es necesario que autentiques tu cuenta de Mercado Pago.
                    </p>
                    <p className={s.p}> Hacé clic en el botón de abajo para autenticar. Te dirigiremos a <span style={{'color':'rgb(0, 158, 227)', 'fontWeight':'bold', backgroundColor: 'rgb(31,32,33)', borderRadius: '8px', padding: '1px 1px 2px 4px', marginRight: '3px'}}> auth.mercadopago.com </span> y después, te volveremos a traer aquí.
                    </p>
                    {/* <Link href="https://auth.mercadopago.com/authorization?client_id=8074988940290506&response_type=code&platform_id=mp&state=011&redirect_uri=http://localhost:3001/mercadopago/reception">
                <button>
                    Ir a autenticar mi cuenta de Mercado Pago
                </button>
            </Link> */}
            {Object.keys(user).length>0 && !user["driver"]["access_token"] && user.user_id &&
                        <button className={s.toAuth} onClick={(e) => handleMP(e)}>Autenticar Mercado Pago</button>
                    }
                    {/* <button className={s.toAuth} onClick={goToA}>
                            <a id='toAuth' href={pathToGetPermission} target="_blank">
                                Autenticar Mercado Pago
                            </a>
                        </button> */}



                    <br />
                    {Object.keys(user).length && user["driver"]["access_token"] && user["driver"]["refresh_token"] && user.user_id ?
                        <p style={{ "color": 'yellowgreen' }}>No hace falta que autentiques, ya lo hiciste.</p>
                        : <p id={s.noAuth}>Autenticate, aún no lo hiciste.</p>
                    }
                    <br />
                </div>
            </div>
        </div>
    )
}