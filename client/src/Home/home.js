import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTrips } from "../redux/actions/getTrips";

//estilos
import style from '../Home/home.module.css'
import logo from "../NavBar/logo-ondrive.png"

//componentes
import FilterByDestination from "../SearchBar/filterByDestination";
import FilterByOrigin from "../SearchBar/filterByOrigin";
import SortAlphabetically from "../SearchBar/sortAlphabetically";
import SortByRating from "../SearchBar/sortByRating";
import SearchBar from "../SearchBar/searchbar";
//import HomeCard from "../HomeCard/HomeCard"
import NavBar from "../NavBar/navbar.js";


//paginado
//loader
//errores

//actions (faltan crear)



export default function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTrips());
    }, [])

    return (
        <div>
            <div>
                <NavBar></NavBar>
                <div className={style.containerFiltros}>
                    <SortAlphabetically style={style.filtros}/>
                    <SortByRating style={style.filtros}/>
                    <FilterByDestination style={style.filtros}/>
                    <SearchBar style={style.filtros} />
                    <FilterByOrigin style={style.filtros}/>
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
                    {/* <div className={style.form}>
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}
