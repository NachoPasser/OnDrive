const { Fuel } = require('../Models/Fuel.js');
const axios = require('axios').default;

/*FUNCTION fetchTable:
LLAMADA A LA 'API' Y RECUPERACION DE TODO EL ELEMENTO <table></table>,
Y SU innerHTML INCLUSIVE.
*/

const fetchTable = async (req, res) => {

    let { refresh } = req.query
    if (!refresh || refresh == "false" || refresh == false) {
        let fuels = await Fuel.findAll()
        if (fuels.length) {
            return res.status(200).json(fuels)
        }
        else {
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

        return res.status(200).send(corte)
    }
    else if (!call) {
        return res.status(404).send("Error al actualizar las tablas.")
    }
};

/* FUNCTION fillModel:
POSTEO DE CADA PRECIO-COMBUSTIBLE EN LA BASE DE DATOS. 
 */

const fillModel = async (req, res) => {

    let { tabla } = req.body
    let selected = []
    function select(t = tabla) {
        for (let y = 12; y >= 0; y--) {
            if (t[1][y] != '' && t[2][y] != '' && t[3][y] != '' && t[4][y] != '') {
                selected.push(t[0][y])
                selected.push(t[1][y])
                selected.push(t[2][y])
                selected.push(t[3][y])
                selected.push(t[4][y])
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

    return res.status(201).send("ok")

};

module.exports = {
    fetchTable,
    fillModel,
}