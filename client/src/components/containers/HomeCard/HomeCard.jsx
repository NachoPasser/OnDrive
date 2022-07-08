import React from "react";
import {Link} from 'react-router-dom';

export default function HomeCard({idviaje, fecha_salida, fecha_llegada, origen, destino, precio, condctor_id, img }){
    return (
        <div className='container'>
            <Link className='link' /*to={`/${idviaje}`}*/>
                <div className='card'>
                </div>
            </Link>
        </div>
        );
}