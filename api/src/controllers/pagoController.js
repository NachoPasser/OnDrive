const { Order } = require('../Models/Order.js');
const { Driver } = require('../Models/Driver.js');
const { OAuth } = require('../Models/OAuth.js');
const server = require('express').Router();
const axios = require('axios').default;

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

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

const reception = async (req, res) => {

    // if (Object.keys(req.body).length) return res.json(req.body)

    let { code, state } = req.query //AMBOS SON STRINGS POR MÄS NÜMEROS QUE HAYA

    console.log(code)

    if (!code || !state) return res.status(204).send(`Código para obtener access_token no fue conseguido, por favor vuelva a autenticar su cuenta de Mercado Pago. Code to get access_token wasn't found, please try again to authenticate your Mercado Pago account.`)

    const requestAccessToken = await axios.post(`https://api.mercadopago.com/oauth/token`, {
        client_secret: "5jdeY13WC6nVNNwsWwxAG7sHjui69B08",
        client_id: "8074988940290506",
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
        return res.status(302).send("Autenticación exitosa. Podés cerrar esta pestaña.")
    }

    // console.log(requestAccessToken.data)
    return res.status(204).json("Algo salió mal.")

}

const access__token = async (req, res) => {
    res.json(req.body)
}

const { ACCESS_TOKEN } = process.env;
// const accessToken= 

//Agrega credenciales

const posteo = async (req, res) => {

    const { dataTrip } = req.body
    const userUserId = dataTrip[2]

    mercadopago.configure({
        access_token: "APP_USR-8074988940290506-072502-1157507314fe0f072808c3a1e331ca0b-705813127"
    });

    const tabla = await Order.findAll()
    const largoTabla = tabla.length + 1

    const id_orden = dataTrip[1].toString() + largoTabla
    // console.log(id_orden)

    //Cargamos el carrido de la bd
    const carrito = dataTrip[0]

    const items_ml = carrito.map(i => ({
        title: i.title,
        unit_price: i.price,
        quantity: 1,
    }))

    let averagePriceForFee = 0
    carrito.map((itm) => averagePriceForFee += itm.price)
    console.log(averagePriceForFee)

    // Crea un objeto de preferencia
    let preference = {
        items: items_ml,
        external_reference: `${id_orden}`,
        payment_methods: {
            excluded_payment_types: [
                {
                    id: "atm"
                }
            ],
            installments: 3  //Cantidad máximo de cuotas
        },
        marketplace: 'MP-MKT-8074988940290506',
        marketplace_fee: averagePriceForFee * 0.06, //6% of comission for us
        back_urls: {
            success: `http://localhost:3001/mercadopago/pagos?userUserId=${userUserId}`,
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
    const { userUserId } = req.query
    const payment_id = req.query.payment_id
    const payment_status = req.query.status
    const external_reference = req.query.external_reference
    const merchant_order_id = req.query.merchant_order_id
    // console.log("EXTERNAL REFERENCE ", external_reference)

    await Order.create({
        status: "completed",
        id_order: external_reference,
        userUserId
    })
    //Aquí edito el status de mi orden
    await Order.findByPk(external_reference)
        .then((order) => {
            order.payment_id = payment_id
            order.payment_status = payment_status
            order.merchant_order_id = merchant_order_id
            order.status = "completed"
            console.info('Salvando order')
            order.save()
                .then((_) => {
                    console.info('redirect success')

                    return res.redirect("http://localhost:3000")
                })
                .catch((err) => {
                    console.error('error al salvar')
                    return res.redirect(`http://localhost:3000/?error=${err}&where=al+salvar`)
                })
        })
        .catch(err => {
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
    // test,
    access__token,
    reception,
    posteo,
    pagos,
    pagosId
}