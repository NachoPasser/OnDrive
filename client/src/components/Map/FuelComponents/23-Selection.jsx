import Prices from "./24-Prices"

export default function Selection({fuels, tabla, distance}) {

    let selected = []
    function select(t) {
        for (let y = 12; y >= 0; y--) {
            if (t[1][y] !== '' && t[2][y] !== '' && t[3][y] !== '' && t[4][y] !== '') {
                selected.push(t[0][y])
                selected.push(t[1][y])
                selected.push(t[2][y])
                selected.push(t[3][y])
                selected.push(t[4][y])
                return selected
            }
        }
    }
    let lastsPrices= select(tabla)
    // console.log(lastsPrices, fuels)
    let objeto= [{}]
    for (let a= 1; a< fuels.length; a++){
        objeto[0][fuels[a]] = lastsPrices[a] 
    }

    return (
        <div>
            <Prices prices={objeto} fuels={fuels} distance={distance} />
        </div>
    )
}