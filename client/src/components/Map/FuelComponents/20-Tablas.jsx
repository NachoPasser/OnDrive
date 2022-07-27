import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from "../../../config/enviroment";
import { getFuelTable } from "../../../redux/actions/getfuels";
import Entablador from "./22-Entablador";
import Selection from "./23-Selection";
import style from './tabla.module.css'
const axios = require("axios").default;

export default function Tabla({ distance }) {

    let result = ""
    let array = useSelector(state => state.prices)
    if (array.length && array[0] !== "Empty") result = array[0]
    // console.log(result.length)
    let dispatch = useDispatch()

    useEffect(() => a())
    function a() { if (result.length < 200) dispatch(getFuelTable(true)) }

    let [tabla, setTabla] = useState([])
    let [show, setShow] = useState(false)
    let [submited, setSubmited] = useState(false)
    let [ok, setOk] = useState(false)
    if (result !== "" && typeof result !== "object" && result !== "Empty" && !tabla.length) {
        var temp = document.createElement('div');
        temp.innerHTML = result;
        var htmlObject = temp.firstChild;
        // console.log(htmlObject)
        document.getElementsByClassName("Tablas")[0].appendChild(htmlObject)
        if (!tabla.length) {
            let colarray = []
            let rowsarray = []
            const col = 13

            for (let a = 0; a < document.getElementsByTagName("td").length; a++) {
                rowsarray.push(document.getElementsByTagName("td")[a].innerText)
                if (rowsarray.length === col) {
                    colarray.push(rowsarray)
                    rowsarray = []
                }
            }
            setTabla(colarray.slice(0, 5))
        }
    }

    function render() {
        if (!show) setShow(true)
        else setShow(false)
    }

    if (ok) {
        setTimeout(() => setOk(false), 3000)
    }


    if (result !== "" && typeof result !== "object" && result !== "Empty" && tabla.length && !submited) {
        // console.log(tabla)
        axios.post(`${API_URL}/fuels/table`, {
            tabla
        }).then(() => setOk(true)).catch(e => console.log(e))
        setSubmited(true)
    }

    let fuels = ["-"]
    for (let a = 1; a < tabla.length; a++) {
        fuels.push(tabla[a][0])
    }
    // console.log(fuels, tabla)

    return (
        <div>
            {!show && !tabla.length && "Cargando últimos precios"}
            {!show && !submited && <div className='Tablas'></div>}
            {submited &&
                <button className={style.stat} onClick={render}>
                    {show ? "Ocultar " : "Mostrar "} precios del combustible
                </button>
            }<br></br><br></br>
            {!show && fuels.length > 0 && tabla.length > 0 && result !== "" && typeof result !== "object" && result !== "Empty" &&
                <Selection fuels={fuels} tabla={tabla} distance={distance} />
            }
            {show &&
                <table>
                    <tbody>
                        {tabla.map((e, i) => <Entablador k={i} key={i} row={e} />)}
                    </tbody>
                </table>
            }
            {ok && "Precios cargados satisfactoriamente."}
        </div>
    )
}