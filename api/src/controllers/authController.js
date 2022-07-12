require('dotenv').config()
const { User, Token} = require('../db.js')
const jwt = require('jsonwebtoken')
const {SECRET_KEY } = process.env;
const axios = require('axios')
const registerUser = async (req, res) => {
    const {email, password, name, last_name} = req.body
    if(!email || !password) return res.status(400).send('Faltan datos obligatorios.')
    const user = {email, password, name, last_name}
    const dbUser = await User.create(user)
    const token = jwt.sign({user}, SECRET_KEY, {expiresIn: '1h'})
    
    res.json({dbUser, token})
}

const logUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    if(!user) res.status(400).json({error: 'Email o contraseña incorrecta.'})
    else res.json(user)
}

const checkUserIsLogged = (req, res) => {
    let token = req.headers['authorization']
    token = token.split(' ')[1]
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {      
          if (err) {
            return res.json({ message: 'Token inválida.' });    
          } else {
            return res.json({message: 'El usuario está logueado.'})
          }
        });
      } else {
        res.send({ 
            message: 'Token no proveída.' 
        });
    }
}

const getUsers = async (req, res) => { //obtener todos los usuarios, obtener usuario por id
   User.findAll().then(u => res.json(u)).catch(e => console.log(e))
}

module.exports = {
    registerUser,
    logUser,
    checkUserIsLogged,
    getUsers,
}