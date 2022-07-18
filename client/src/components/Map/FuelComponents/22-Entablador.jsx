import React from "react";
import './tabla.css';

export default function Entablador({row, k}){
    return (
        <tr>
            {row && row.map((r, i)=> <td className={i===0 || k===0? "header" : "body"} key={i}>{r=== "" || i===0 || k===0? "": "$"}{r}</td>)}
        </tr>
    )
}