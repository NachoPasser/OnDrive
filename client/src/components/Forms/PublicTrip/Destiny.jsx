import react from 'react';
import { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';

export default function Destiny(){

    const apiKey='AIzaSyBTSe1dsHnxEjiQ2b2_-mb84E4LQeRKU9I'

    let [origen, setOrigen]= useState('')
    let [point, setPoint] = useState('')
    
    let arrayPoint= ["origen", "point"]
    let placeholders= [ "Origen", "Destino"]

    console.log (origen, point)
    return(<>
        <label style={{'color': 'rgb(165,165,165)', 'fontSize': '22px'}}>
            {placeholders[1]}
        </label> 
        <Autocomplete 
            apiKey={apiKey} 
        />
    </>)
}