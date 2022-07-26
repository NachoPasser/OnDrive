import React from "react";
import style from './tabla.module.css'

export default function Entablador({row, k}){
    return (
        <tr>
            {row && row.map((r, i)=> <td className={i===0 || k===0? style.header : style.body} key={i}>{r=== "" || i===0 || k===0? "": "$"}{r}</td>)}
        </tr>
    )
}