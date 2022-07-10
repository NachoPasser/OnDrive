import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeCard from "../components/containers/HomeCard/HomeCard.jsx";

//componentes
//import HomeCard from "../HomeCard/HomeCard"
import NavBar from "../NavBar/navbar.js";


//paginado
//loader
//errores

//actions (faltan crear)



export default function Home() {

    // //dispatch
    // //const dispatch = useDispatch()

    // //estados globales
    // //traer todos los travels

    // useEffect(() => {
    //     dispatch(/*accion que trae todos los travels*/);
    // }, [dispatch])

    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <div>holiwis</div>
            <HomeCard/>
        </div>
    )
}
