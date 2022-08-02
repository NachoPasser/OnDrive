const { Order } = require('../Models/Order.js');
const { OrderDetail } = require('../Models/OrderDetail.js');
const { Driver } = require('../Models/Driver.js');
const { OAuth } = require('../Models/OAuth.js');
const { Trip } = require('../Models/Trip.js');
const server = require('express').Router();
const axios = require('axios').default;

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

const {
    MARKET_PLACE,
    FEE,
    CLIENT_SECRET,
    CLIENT_ID,
    ACCESS_TOKEN
} = process.env;

const reception = async (req, res) => {

    let { code, state } = req.query //AMBOS SON STRINGS POR MÄS NÜMEROS QUE HAYA

    if (!code || !state) return res.status(204).send(`Código para obtener access_token no fue conseguido, por favor vuelva a autenticar su cuenta de Mercado Pago. Code to get access_token wasn't found, please try again to authenticate your Mercado Pago account.`)

    const requestAccessToken = await axios.post(`https://api.mercadopago.com/oauth/token`, {
        client_secret: CLIENT_SECRET,
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: `http://localhost:3001/mercadopago/reception`
    })

    // let object = { code, state }
    // console.log(object)
    if (requestAccessToken) {
        //RESCATAMOS EL OBJETO NETO
        let user_id
        if (state) user_id = state.slice(0, 36)
        else if (!state) return res.send("No pudimos recibir determinado dato (id de usuario), vuelva a intentar")
        const data = requestAccessToken.data
        //LE EXTRAEMOS LO IMPORTANTE
        const access_token = data.access_token
        const refresh_token = data.refresh_token

        let conductorDesignadoYResponsable = await Driver.findOne({ //findOne devuelve un objeto {} con props a modo de fields 
            where: {
                user_id
            }
        }) //¿Cuál es la PK de los drivers?

        let findDriverID = await OAuth.create({
            access_token,
            refresh_token,
            driver_id: conductorDesignadoYResponsable.dataValues.driver_id,
        });
        return res.redirect("http://localhost:3000/home-drivers")
    }

    // console.log(requestAccessToken.data)
    return res.status(204).json("Algo salió mal.")

}

//Agrega credenciales

const posteo = async (req, res) => {

    const { dataTrip } = req.body

    const tabla = await Order.findAll()
    const largoTabla = tabla.length + 1

    const mall_cart = dataTrip[0]
    const id_order = dataTrip[1].toString() + "_T0" + largoTabla //trip_id +'_T01'
    const user_id = dataTrip[2]
    const driver_id = dataTrip[3]
    const quantity = dataTrip[4]
    const email_driver = dataTrip[5]
    // const descpription = dataTrip[6]
    // const picture_url = dataTrip[7]

    // console.log('quantity desde front', quantity)
    // console.log('driver_id desde front', driver_id)
    let auth_segun_driver = await OAuth.findOne({ //LLENO UNA FILA PARA EL AUTH DE UN DRIVER
        where: {
            driver_id
        }
    })
    console.log(auth_segun_driver)
    var access_token = ACCESS_TOKEN
    if (auth_segun_driver) {
        if (Object.keys(auth_segun_driver).length) {
            console.log("primer if", auth_segun_driver)
            if (auth_segun_driver.dataValues.access_token) {
                console.log("segundo if", auth_segun_driver)
                access_token = auth_segun_driver.dataValues.access_token
            }
        }
    }
    // console.log("access_token aquí", auth_segun_driver.dataValues.access_token)
    mercadopago.configure({ //CONFIGURO ESA COMPRA PARA QUE SE DEPOSITE AL MP DEL DRIVER
        access_token,
        //En caso de que alguno de nosotros se olvide de autenticarse y no haya access_token de conductor, aparece el access_token de OnDrive para recibir el 96% del pago, y en consecuencia, no se rompa el back por faltarle un access_token a la configuración de mercadopago :D
    });
    // console.log('carrito', mall_cart)
    // console.log('dataTrip', dataTrip)
    const items_ml = mall_cart.map(i => ({
        id: id_order,
        title: i.title,
        unit_price: i.price,
        quantity: 1,
        // descpription: email_driver,
        // picture_url,
    }))

    let name = dataTrip[0][0].title
    let price = dataTrip[0][0].price
    let trip_id = dataTrip[1]

    let averagePriceForFee = 0
    mall_cart.map((itm) => averagePriceForFee += itm.price)
    // console.log(averagePriceForFee)

    // Crea un objeto de preferencia
    let preference = {
        items: items_ml,
        external_reference: id_order + "|" + email_driver,
        payment_methods: {
            installments: 3  //Cantidad máximo de cuotas
        },
        marketplace: MARKET_PLACE,//,
        marketplace_fee: averagePriceForFee * FEE, //comission for us
        back_urls: {
            success: `http://localhost:3001/mercadopago/pagos?user_id=${user_id}&name=${name}&price=${price}&trip_id=${trip_id}&quantity=${quantity}`,
            failure: 'http://localhost:3001/mercadopago/pagos',
            pending: 'http://localhost:3001/mercadopago/pagos',
        },
    };

    mercadopago.preferences.create(preference)

        .then(function (response) {
            // console.info('respondio')
            //Este valor reemplazará el string"<%= global.id %>" en tu HTML
            global.id = response.body.id;
            // console.log(response.body)
            res.json({ id: global.id });
        })
        .catch(function (error) {
            console.log(error);
        })

}


const pagos = async (req, res) => {

    // console.info("EN LA RUTA PAGOS ", req)
    console.log(req.query)
    const { user_id, name, price, trip_id, quantity } = req.query
    const payment_id = req.query.payment_id
    const payment_status = req.query.status
    const external_reference = req.query.external_reference
    const merchant_order_id = req.query.merchant_order_id
    // console.log("EXTERNAL REFERENCE ", external_reference)
    const id_order = external_reference

    await axios.post('http://localhost:3001/trip/purchase-trip', { //EDITO CAPACIDAD DEL VIAJE COMPRADO
        user_id,
        trip_id,
        capacity: quantity,
    }).then(r => console.log("capacidad descontada en", quantity)).catch(e => console.log(e))

    await OrderDetail.create({
        name,
        price,
        quantity,
        id_order, //CAMPO RELACIONAL
        // trip_id,
    })

    await Order.create({
        status: 'completed',
        id_order, //CAMPO RELACIONAL
        user_id,
        payment_id,
        payment_status,
        merchant_order_id,
    }).then(() => {
        console.log('redirect success')
        return res.redirect("http://localhost:3000/home-passengers")
    }).catch((err) => {
        console.error('error al salvar')
        return res.redirect(`http://localhost:3000/error/?error=${err}&where=al+salvar`)
    }).catch(err => {
        console.error('error al buscar')
        return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
    })

}

const pagosId = async (req, res) => {
    //Busco información de una orden de pago
    // server.get("/pagos/:id", (req, res) => {
    const mp = new mercadopago(ACCESS_TOKEN)
    const id = req.params.id
    console.info("Buscando el id", id)
    mp.get(`/v1/payments/search`, { 'status': 'pending' }) //{"external_reference":id})
        .then(resultado => {
            // console.info('resultado', resultado)
            res.json({ "resultado": resultado })
        })
        .catch(err => {
            console.error('No se consulto:', err)
            res.json({
                error: err
            })
        })
}

module.exports = {
    reception,
    posteo,
    pagos,
    pagosId
}