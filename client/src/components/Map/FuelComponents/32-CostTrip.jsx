import { useState } from "react";
import { useSelector } from "react-redux";
import DiseñoMágico from "./40-DiseñoMágico";
import style from './tabla.module.css'

export default function CostTrip({distance, unicFuel, prices, setPrice, fuels}){
    // console.log("distance", distance)

    if(distance.slice(distance.length-2,distance.length)=='mi'){
        distance= parseFloat(distance.split(",").join(""))
        distance= distance *1.609344
    }
    
    if(distance.slice(distance.length-2,distance.length)=='km'){
        distance= parseFloat(distance.split(",").join(""))
    }

    // let globalPrice= useSelector((state)=> state.globalprice)
    
    let [litres, setLitres] = useState(true)
    let [l, setL] = useState({ int: 0, dec: 0 })
    let [result, setResult] = useState()
    let total = l.int + l.dec

    if(result) setPrice(parseFloat(result.toFixed(2)))
    // if(result) dispatch(updatePrice(result))

    if(!distance && result){
        setResult(0)
    }

    function execute() {
        // console.log( unicFuel )
        litres? setResult(((total* distance)/ 100)* parseFloat(unicFuel[1])):
        setResult((distance/ total)* parseFloat(unicFuel[1]))
    }

    function change() {
        litres ? setLitres(false) : setLitres(true)
    }

    let numbers = []
    for (let n = 0; n <= 100; n++) {
        numbers.push(n)
    }

    // console.log("l", l.int+l.dec)

    function disable() {
        if (unicFuel[1] && total && distance) return false
        return true
    }  

    console.log(distance)

    return (
        <div>
            <h3>Consumo del vehículo:</h3>
            {<>
                <select className={total ? style.valid : style.error} onChange={(e) => setL({ ...l, int: parseInt(e.target.value) })}>
                    {numbers.slice(0, 20).map((n, i) => <option key={i}>{n}</option>)}
                </select>
                <select className={total ? style.valid : style.error} onChange={(e) => setL({ ...l, dec: parseInt(e.target.value.slice(1)) * 0.1 })}>
                    {numbers.slice(0, 10).map((n, i) => <option key={i}>.{n}</option>)}
                </select>
            </>}
            {litres && <>
                <b style={{ "color": "rgb(50, 200, 200)" }}> {parseFloat(total.toFixed(2))}</b> litros por cada 100 km.
            </>}
            {!litres && <>
                <b style={{ "color": "magenta" }}> {parseFloat(total.toFixed(2))}</b> kilómetros por litro.
            </>
            }
            {distance ? <><br></br><br></br></> : <p className={style.leyendaError}>Inserte Origen, Destino y calcule la ruta.</p>}
            <button style={{ "width": "260px" }} onClick={change}> Cambiar a
                {litres ? " kilómetros por litro" : " litros por cada 100 kilómetros"}
            </button>
            <button onClick={execute} disabled={disable()} className={unicFuel[1] && total && distance ? style.go : style.notgo}>
                Estimar precio de un viaje
            </button>
            {result && distance ? <><br />Precio estimado: AR$ {parseFloat(result.toFixed(2))}</> : <br />}
        </div>
    )
}
