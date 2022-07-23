const { Order } = require('../Models/Order');
const router = require('express').Router();

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
    access_token: ACCESS_TOKEN
});


//Ruta que genera la URL de MercadoPago
router.post("/", async (req, res, next) => {
    const { dataTrip } = req.body
    const userUserId = dataTrip[2]

    const tabla = await Order.findAll()
    const largoTabla = tabla.length + 1

    const id_orden = dataTrip[1].toString() + largoTabla
    console.log(id_orden)

    //Cargamos el carrido de la bd
    const carrito = dataTrip[0]

    const items_ml = carrito.map(i => ({
        title: i.title,
        unit_price: i.price,
        quantity: 1,
    }))

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
        back_urls: {
            success: `http://localhost:3001/mercadopago/pagos?userUserId=${userUserId}`,
            failure: 'http://localhost:3001/mercadopago/pagos',
            pending: 'http://localhost:3001/mercadopago/pagos',
        },
    };

    mercadopago.preferences.create(preference)

        .then(function (response) {
            console.info('respondio')
            //Este valor reemplazará el string"<%= global.id %>" en tu HTML
            global.id = response.body.id;
            console.log(response.body)
            res.json({ id: global.id });
        })
        .catch(function (error) {
            console.log(error);
        })
})


//Ruta que recibe la información del pago
router.get("/pagos", async (req, res) => {
    console.info("EN LA RUTA PAGOS ", req)
    const { userUserId } = req.query
    const payment_id = req.query.payment_id
    const payment_status = req.query.status
    const external_reference = req.query.external_reference
    const merchant_order_id = req.query.merchant_order_id
    console.log("EXTERNAL REFERENCE ", external_reference)

    await Order.create({
        status: "completed",
        id_order: external_reference,
        userUserId
    })
    //Aquí edito el status de mi orden
    Order.findByPk(external_reference)
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
                    console.error('error al salvar', err)
                    return res.redirect(`http://localhost:3000/?error=${err}&where=al+salvar`)
                })
        })
        .catch(err => {
            console.error('error al buscar', err)
            return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
        })

    //proceso los datos del pago 
    //redirijo de nuevo a react con mensaje de exito, falla o pendiente
})


//Busco información de una orden de pago
router.get("/pagos/:id", (req, res) => {
    const mp = new mercadopago(ACCESS_TOKEN)
    const id = req.params.id
    console.info("Buscando el id", id)
    mp.get(`/v1/payments/search`, { 'status': 'pending' }) //{"external_reference":id})
        .then(resultado => {
            console.info('resultado', resultado)
            res.json({ "resultado": resultado })
        })
        .catch(err => {
            console.error('No se consulto:', err)
            res.json({
                error: err
            })
        })
})

module.exports = router;