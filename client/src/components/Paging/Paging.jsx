import React from 'react'
import s from './Paging.module.css'
export default function Paging({setNumber, max, actualPage}) {
    let pages = []
   
    for (let i = 1; i <= max; i++) {
            pages.push(i)
    }

    return (
        <div className={s.paging}>
            <div className={s.arrowsContainer}>
                <button className={s.arrows} disabled={actualPage === 1 ? true : false} onClick={() => setNumber(prev => prev - 1)}>🡰</button>
                <span>{actualPage} de {max}</span>
                <button className={s.arrows} disabled={actualPage === max ? true : false} onClick={() => setNumber(prev => prev + 1)}>🡲</button>
            </div>
        </div>
    )
}
