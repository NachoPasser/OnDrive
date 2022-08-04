import React from 'react';
import { useState } from 'react';
import './magia.css';

export default function DiseñoMágico({distance}){
    
    if(distance.slice(distance.length-2,distance.length)=='mi'){
        distance= parseFloat(distance.split(",").join(""))
        distance= distance *1.609344
    }
    
    if(distance.slice(distance.length-2,distance.length)=='km'){
        distance= parseFloat(distance.split(",").join(""))
    }

    let fuels= ["_", "Super", "Premium", "Gasoil", "Euro"]
    let prices= [{_: 0, Super: 120.3, Premium: 128.1, Gasoil: 147.3, Euro: 175}]

    let [render, setRender] = useState([])
    let [l, setL] = useState({ int: 0, dec: 0 })
    let [result, setResult] = useState()
    let total = l.int + l.dec

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
    
    let numbers = []
    for (let n = 0; n <= 100; n++) {
        numbers.push(n)
    }
    
    function execute() {
        if(!distance || !render[1] || !total) return setResult()
        setResult((distance/ total)* parseFloat(render[1]))
    }

    return (
        <div className='disaffected'>
            <label id='title'><div>Calculadora de costos:</div><div id='ask'>¿Cómo funciona?</div></label>
            <div className='main_div'>
                <div className='horiz' id="calc">
                    <div className='selects'>
                        <label>Tipo de combustible</label>
                        <select className='specific_select' placeholder='Combustible' onChange={(e) => handleOption(e)}>
                            {fuels && fuels.map((fuel, i) => <option key={i}>{fuel}</option>)}
                        </select>
                    </div>
                    <br/>
                    <div className='selects'>
                        <label>Consumo del vehículo</label>
                        {/* <select  className='specific_select' placeholder='mk/litro'></select> */}
                        <select className='twins' onChange={(e) => setL({ ...l, int: parseInt(e.target.value) })}>
                            {numbers.slice(0, 20).map((n, i) => <option key={i}>{n}</option>)}
                        </select>
                        <select className='twins' onChange={(e) => setL({ ...l, dec: parseInt(e.target.value.slice(1)) * 0.1 })}>
                            {numbers.slice(0, 10).map((n, i) => <option key={i}>.{n}</option>)}
                        </select>
                    </div>
                    <br />
                    <div className='buttons'>
                        <label></label>
                        <button className='calc_button' onClick={execute}>
                            Calcular costo
                        </button>
                    </div>
                </div>
                <br/>
                <div className='horiz' id='result'>
                    <br />
                    <label id='cost'>Costo estimado</label>
                    <br />
                    <label id='res'>{result && distance && <>AR$ {parseFloat(result.toFixed(2))}</>}</label>
                    <p id='kml'>km/l</p>
                </div>
                <div className='client'>
                    <p>Una vez ingresados un origen y un destino en el mapa y calculada la ruta, deberás indicar el tipo de combustible y el consumo de tu vehículo en kilómetros por litro para poder estimar el costo del viaje.</p>
                </div>
            </div>
        </div>
    )
}