import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//estilos
import style from '../Home/home.module.css'
import logo from "../NavBar/logo-ondrive.png"

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
                <div className={style.containerFiltros}>
                    <select className={style.filtros}>
                        <option value="default" selected="selected" hidden>-Filtro-</option>
                        <option>opcion 1</option>
                        <option>opcion 2</option>
                        <option>opcion 3</option>
                    </select>
                    <select className={style.filtros}>
                        <option value="default" selected="selected" hidden>-Filtro-</option>
                        <option>opcion 1</option>
                        <option>opcion 2</option>
                        <option>opcion 3</option>
                    </select>
                    <select className={style.filtros}>
                        <option value="default" selected="selected" hidden>-Filtro-</option>
                        <option>opcion 1</option>
                        <option>opcion 2</option>
                        <option>opcion 3</option>
                    </select>
                    <select className={style.filtros}>
                        <option value="default" selected="selected" hidden>-Filtro-</option>
                        <option>opcion 1</option>
                        <option>opcion 2</option>
                        <option>opcion 3</option>
                    </select>
                </div>
            </div>
            <div className={style.divisor}>
                <div className={style.homecards}>
                    <div className={style.cards}>
                        <img src={logo}></img>
                        <p>descripcion breve</p>
                    </div>
                    <div className={style.cards}>
                        <img src={logo}></img>
                        <p>descripcion breve</p>
                    </div>
                    <div className={style.cards}>
                        <img src={logo}></img>
                        <p>descripcion breve</p>
                    </div>
                    <div className={style.cards}>
                        <img src={logo}></img>
                        <p>descripcion breve</p>
                    </div>
                    <div className={style.cards}>
                        <img src={logo}></img>
                        <p>descripcion breve</p>
                    </div>
                    <div className={style.cards}>
                        <img src={logo}></img>
                        <p>descripcion breve</p>
                    </div>
                    <div className={style.cards}>
                        <img src={logo}></img>
                        <p>descripcion breve</p>
                    </div>
                    <div className={style.cards}>
                        <img src={logo}></img>
                        <p>descripcion breve</p>
                    </div>
                    <div className={style.cards}>
                        <img src={logo}></img>
                        <p>descripcion breve</p>
                    </div>
                </div>
                <div className={style.mapYform}>
                    <div className={style.mapa}>
                        <img id={style.maps} src="https://noticiasrtv.com/wp-content/uploads/2020/02/Google-Maps-celebra-15-anos-con-novedades-y-un-nuevo.jpg"></img>
                    </div>
                    <div className={style.form}>
                        <input
                            type='text'
                            name=''
                            value=""
                            placeholder='Campo 1'
                            onChange=""
                        />
                        <input
                            type='text'
                            name=''
                            value=""
                            placeholder='Campo 2'
                            onChange=""
                        />
                        <input
                            type='text'
                            name=''
                            value=""
                            placeholder='Campo 3'
                            onChange=""
                        />
                        <input
                            type='text'
                            name=''
                            value=""
                            placeholder='Campo 4'
                            onChange=""
                        />
                        <input
                            type='text'
                            name=''
                            value=""
                            placeholder='Campo 5'
                            onChange=""
                        />
                        <button className={style.submit} type='submit'>Boton</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
