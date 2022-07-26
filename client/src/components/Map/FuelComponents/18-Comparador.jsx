import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFuelTable } from "../../../redux/actions/getfuels.js";
import Tabla from "./20-Tablas";
import Prices from "./24-Prices";

//estilos
import style from './tabla.module.css'

export default function Comparador({ distance }) {

    let [renderTabla, setRenderTabla] = useState(false)
    let [reload, setReload] = useState(false)
    let [comp_prices, setComp_prices] = useState({
        state: false,
        oils: [],
        costs: {},
    })

    const dispatch = useDispatch()
    let prices = useSelector(state => state.prices) //[]

    function a() {
        if (!prices.length) {
            dispatch(getFuelTable())
        }
    }
    useEffect(() => a())

    if (prices.length && prices[0] === 'Empty' && !renderTabla && !comp_prices) {
        // console.log(29)
        setRenderTabla(true)
    }

    let fuels = []
    let thePrices
    if (!comp_prices.state && prices.length && prices[0].length && typeof prices[0][0] === "object") {
        for (let fuel in prices[0][0]) {
            fuels.push(fuel)
        }
        fuels = fuels.slice(3, 7)
        fuels.unshift("-")
        thePrices = prices[0]
        setComp_prices({
            oils: [...fuels],
            costs: { ...thePrices },
            state: true,
        })
    }

    function seeTable() {

        setReload(true)
    }

    // console.log(comp_prices)

    return (
        <div>
            {!renderTabla && !reload &&
                <button className={style.button} onClick={seeTable}>
                    Ver Tabla de costos
                </button>
            }
            {comp_prices.state && prices.length > 0 && prices[0].length && typeof prices[0][0] === "object" &&
                <div>
                    <Prices prices={comp_prices.costs} fuels={comp_prices.oils} distance={distance} />
                </div>}
            <div>
                {!reload === renderTabla && <Tabla distance={distance} />}
            </div>
        </div>
    )
}