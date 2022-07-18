const { Fuel } = require('../Models/Fuel.js');
const axios = require('axios').default;

/*PRIMERA FUNCTION lookFuelModel:
BUSCA EN EL MODELO 'Fuel' DE LA BASE DE DATOS.
SI ESTA TABLA 'Fuel' SE ENCUENTRA VACÍA,
O SI TIENE INFO DEL DÍA ANTERIOR,
LLAMA A LA 'API'.
*/
const lookFuelModel = async (req, res) => {
    let fuels = await Fuel.findAll()

    if (fuels.length) {
        let today = new Date()
        let todayString = today.toDateString()
        let updatedString = fuels[0].dataValues['updatedAt'].toDateString()
        if (todayString === updatedString) {
            return res.status(200).json(fuels)
        }
    }
    return res.status(200).json(["Empty"])
};

/*SEGUNDA FUNCTION fetchTable:
LLAMADA A LA 'API' Y RECUPERACION DE TODO EL ELEMENTO <table></table>,
Y SU innerHTML INCLUSIVE.
*/

const fetchTable = async (req, res) => {

    let { refresh } = req.query
    if (!refresh || refresh == "false" || refresh == false) {
        let fuels = await Fuel.findAll()
        if (fuels.length) {
            // console.log("modelo fuels")
            return res.status(200).json(fuels)
        }
        else {
            // console.log("Empty")
            return res.status(200).json(["Empty"])
        }
    }

    let call = await axios.get(
        "https://surtidores.com.ar/precios/")
    if (call) {

        function firstcut(string = call.data) {
            for (let b = 0; b < string.length; b++) {
                if (string[b] === "<" && string[b + 1] === "t" && string[b + 2] === "a") {
                    let q = string.slice(b)
                    return q
                }
            }
        }
        let cut = firstcut()
        function totalcut() {
            for (let z = 0; z <= cut.length; z++) {
                if (cut[z] == "/" && cut[z + 1] == "t" && cut[z + 2] == "a" && cut[z + 3] == "b" && cut[z + 4] == "l" && cut[z + 5] == "e") {
                    let tot = cut.slice(0, z + 7)
                    return tot
                }
            }
        }
        let corte = totalcut()

        // console.log("Desde el sitio")
        return res.status(200).send(corte)
    }
    else if (!call) {
        return res.status(404).send("Error al actualizar las tablas.")
    }
};

/* TERCERA FUNCTION fillModel:
POSTEO DE LOS DATOS EN LA BASE DE DATOS. 
¿Por qué no guardé los datos al llamar a la api?
Porque la llamada no devuelve una respuesta en json,
sino un elemento <table></table> en formato HTML.
Era necesario, darle esa información HTML al frontend,
para manipularla con el elemento document, y reenviarla
al back en forma de javascript.
 */

const fillModel = async (req, res) => {

    let { tabla } = req.body
    // console.log(tabla)
    let selected = []
    function select(t = tabla) {
        for (let y = 12; y >= 0; y--) {
            if (t[1][y] != '' && t[2][y] != '' && t[3][y] != '' && t[4][y] != '') {
                selected.push(t[0][y])
                selected.push(t[1][y])
                selected.push(t[2][y])
                selected.push(t[3][y])
                selected.push(t[4][y])
                // console.log(selected)
                return selected
            }
        }
    }
    let year = parseInt(tabla[0][0])
    let r = select()
    let fuels = await Fuel.findAll()
    if (fuels.length > 0) {
        for (let a = 0; a < fuels.length; a++) {
            let fila = await Fuel.destroy({
                where: { id: fuels[a].dataValues.id },
            });
        }
    }

    await Fuel.create({
        Year: year,
        Month: r[0],
        Super: r[1],
        Premium: r[2],
        Gasoil: r[3],
        Euro: r[4],
    })

    let fuels2 = await Fuel.findAll()

    if (fuels2.length > 1) {
        for (let a = 1; a < fuels2.length; a++) {
            let fila = await Fuel.destroy({
                where: { id: fuels2[a].dataValues.id },
            });
        }
    }

    // console.log("Posteamos")
    return res.status(201).send("ok")

};

module.exports = {
    lookFuelModel,
    fetchTable,
    fillModel,
}