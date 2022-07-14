const { User, Token} = require('../db.js')
const jwt = require('jsonwebtoken')
const {SECRET_KEY } = process.env;
const axios = require('axios')
const registerUser = async (req, res) => {
    const {email, password, name, last_name} = req.body
    if(!email) return res.status(400).send('Faltan datos obligatorios.')
    const user = {email, password, name, last_name}
    const dbUser = await User.create(user) // meter solo id de usuario a token
    const token = jwt.sign({id: dbUser.id}, SECRET_KEY, {expiresIn: '1h'})
    
    res.json({token})
}

const logUser = async (req, res) => {
    const {email, password} = req.body

    if(!password){
      var user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
    } else {
      var user = await User.findOne({
          where: {
              email: email,
              password: password
          }
      })
    }
    
    if(!user){
      res.status(400).json({error: 'Email o contraseña incorrecta.'})
    }
    else{
      const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: '1h'})
      res.json({token})
    }
    
}

const checkUserIsLogged = async (req, res) => {
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

const getUserByToken = async (req, res) => {
}

const getUsers = async (req, res) => {
  User.findAll()
  .then(u => res.json(u))
  .catch(e => res.json(e))
}

module.exports = {
    registerUser,
    getUsers,
    getUserByToken,
    logUser,
    checkUserIsLogged
}