import { useState } from "react"
import CostTrip from "./32-CostTrip";
import DiseñoMágico from "./40-DiseñoMágico";
// import './tabla.css';
import style from './tabla.module.css'

export default function Prices({prices, fuels, distance, price, setPrice}){

    let [render, setRender] = useState([])
    // console.log(prices, fuels)

    let objeto = {}

    for (let c = 1; c < fuels.length; c++) {
        let combus = fuels[c]
        objeto[combus] = prices[0][combus]
    }

    function handleOption(e) {
        let clave = e.target.value
        let valor = objeto[e.target.value]
        setRender([clave, valor])
    }

    return (
        <div>{"Combustible "}
            <select className={render.length > 0 && render[0] !== fuels[0] ? style.valid : style.error} onChange={(e) => handleOption(e)}>
                {fuels.map((fuel, i) => <option key={i}>{fuel}</option>)}
            </select><span style={{ "width": "4px", "color": "red", "fontSize": "15px" }}>{render.length > 0 && render[0] !== fuels[0] ? "" : "*"}</span>
            <div>
                {render.length > 0 && render[0] !== fuels[0] ?
                    <>{render[0]} = {render[1]}</> : <br />
                }
            </div>
            <CostTrip prices={prices} unicFuel={render} distance={distance} price={price} setPrice={setPrice} fuels={fuels} />
            {/*  */}
        </div>
    )
}