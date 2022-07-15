const nodemailer = require('nodemailer');
const User = require('../db').User;
const { SECRET_KEY} = process.env;
const jwt = require('jsonwebtoken');

const recoverPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        return res.status(400).send('Email no encontrado');
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 456,
        secure: true,
        auth: {
            user: 'ondrive.staff@gmail.com',
            pass: 'qvaficmteifpsgzw'
        }
    });
    const mailOptions = {
        from: '"Recuperación de contraseña" <ondrive.staff@gmail.com>' ,
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Hola ${user.name} ${user.last_name}, tu contraseña es: ${user.password}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
    res.send('Email enviado');
}


const changePass = async (req, res) => {
    const { token } = req.params;
    let id = 0
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err){
            return res.json({message: 'Token inválida.'})
        } else{
            id = decoded.id
        }
    })
    const { password } = req.body;
    const user = await User.findOne({
        where: {
            id
        }
    });
    if (!user) {
        return res.status(400).send('Usuario no encontrado');
    }
    user.password = password;
    await user.save();
    res.send('Contraseña cambiada');
}

module.exports = {
    recoverPassword, changePass
}