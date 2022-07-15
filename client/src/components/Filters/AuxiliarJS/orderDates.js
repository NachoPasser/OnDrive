export function Ascensora(dates, all, min, max) {//ASCENSORA POR FECHAS
    for (let i = 1; i < dates.length; i++) {
        for (let o = i; o >= 1; o--) {
            if (dates[o] < dates[o - 1]) {
                var box = dates[o]
                dates[o] = dates[o - 1]
                dates[o - 1] = box
            }
        }
    }
    if (all) {
        return dates
    }
    if (min) {
        return dates[0]
    }
    if (max) {
        return dates[dates.length - 1]
    }
}

export default function sumarDias(fecha, dias) {
    // console.log(fecha)
    new Date(fecha).setDate(new Date(fecha).getDate() + dias);
    return fecha;
}