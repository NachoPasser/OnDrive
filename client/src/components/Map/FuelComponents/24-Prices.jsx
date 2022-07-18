import { useState } from "react"
import CostTrip from "./32-CostTrip";
import './tabla.css';

export default function Prices({prices, fuels, distance}){

    let [render, setRender] = useState([])
    // console.log(prices, fuels)

    let objeto ={}

    for (let c= 1; c< fuels.length; c++){
        let combus= fuels[c]
        objeto[combus]=prices[0][combus]
    }

    function handleOption(e){
        let clave= e.target.value
        let valor= objeto[e.target.value]
        setRender([clave, valor])
    }

    return (
        <div>{"Combustible "} 
            <select className={render.length > 0 && render[0]!== fuels[0] ? "valid" : "error"} onChange={(e)=>handleOption(e)}>
                {fuels.map((fuel, i)=><option key={i}>{fuel}</option>)}
            </select><span style={{"width":"4px", "color": "red", "fontSize":"15px"}}>{render.length > 0 && render[0]!== fuels[0] ? "":"*" }</span>

            <div>
            {render.length > 0 && render[0]!== fuels[0] ?
                    <>{render[0]} = {render[1]}</> : <br/> 
            }
            </div>
            <CostTrip unicFuel={render} distance={distance}/>
        </div>
    )
}