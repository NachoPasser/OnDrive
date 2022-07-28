const { Order } = require('../Models/Order.js');
const { OrderDetail } = require('../Models/OrderDetail.js');
const { Driver } = require('../Models/Driver.js');
const { OAuth } = require('../Models/OAuth.js');
const server = require('express').Router();
const axios = require('axios').default;

// SDK de Mercado Pago
const mercadopago = require('mercadopago');
const { Trip } = require('../Models/Trip.js');

//ACÁ VAN LAS RUTAS PARA CONSEGUIR EL ACCESS TOKEN

const test = async (req, res) => { // PARA COMPROBAR QUE 'http://localhost:3001/mercadopago/' Y SUS VARIACIONES FUNCIONAN
    let { code, state } = req.query
    let object = { code, state }

    const requestAccessToken = await axios.post(`https://api.mercadopago.com/oauth/token`, {
        client_secret: "5jdeY13WC6nVNNwsWwxAG7sHjui69B08",
        client_id: "8074988940290506",
        grant_type: "authorization_code",
        code,
        redirect_uri: `http://localhost:3001/mercadopago/reception`
    })

    let response = [object, requestAccessToken.data]

    if (Object.keys(response[0]).length === 2 && Object.keys(response[1]).length) return res.send("Autenticación exitosa. Podés cerrar esta pestaña.")

    return res.json("Algo salió mal.")

}

const {
    MARKET_PLACE,
    FEE,
    CLIENT_SECRET,
    CLIENT_ID
} = process.env;

const reception = async (req, res) => {

    // if (Object.keys(req.body).length) return res.json(req.body)

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
        else if (!state) return res.send("Disculpe, no pudimos recibir determinado dato (id de usuario), vuelva a intentar por favor")
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

    const carrito = dataTrip[0]
    const id_order = dataTrip[1].toString() + "_T0" + largoTabla //trip_id +'_T01
    const user_id = dataTrip[2]
    const driver_id = dataTrip[3]
    const quantity = dataTrip[4]

    // const descpription = dataTrip[5]
    // const picture_url = dataTrip[6]

    await axios.post('http://localhost:3001/trip/purchase-trip', { //EDITO CAPACIDAD DEL VIAJE COMPRADO
        user_id,
        trip_id: dataTrip[1],
        capacity: quantity,
    }).then(r => console.log(r.data)).catch(e => console.log(e))

    let access_token = await OAuth.findOne({ //LLENO UNA FILA PARA EL AUTH DE UN DRIVER
        where: {
            driver_id
        }
    })

    mercadopago.configure({ //CONFIGURO ESA COMPRA PARA QUE SE DEPOSITE AL MP DEL DRIVER
        access_token,
    });

    console.log(carrito)

    const items_ml = carrito.map(i => ({
        id: id_order,
        title: i.title,
        unit_price: i.price,
        quantity: 1,
        // descpription,
        // picture_url,
    }))

    await OrderDetail.create({
        name: dataTrip[0].title,
        price: dataTrip[0].price,
        quantity,
        id_order,
        trip_id: dataTrip[1]
    })

    let averagePriceForFee = 0
    carrito.map((itm) => averagePriceForFee += itm.price)
    console.log(averagePriceForFee)

    // Crea un objeto de preferencia
    let preference = {
        items: items_ml,
        external_reference: `${id_order}`,
        payment_methods: {
            installments: 3  //Cantidad máximo de cuotas
        },
        marketplace: MARKET_PLACE,
        marketplace_fee: averagePriceForFee * FEE, //comission for us
        back_urls: {
            success: `http://localhost:3001/mercadopago/pagos?user_id=${user_id}`,
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
    const { user_id } = req.query
    const payment_id = req.query.payment_id
    const payment_status = req.query.status
    const external_reference = req.query.external_reference
    const merchant_order_id = req.query.merchant_order_id
    // console.log("EXTERNAL REFERENCE ", external_reference)

    await Order.create({
        status: 'completed',
        id_order: external_reference,
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