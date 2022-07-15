const { setBanStatus } = require("../Models/utils/Admin");
const { Admin } = require("../db"); //admin model
const {SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken')
async function banUser(req, res) {
  try {
    const { ban_email } = req.body;
    const msg = await setBanStatus(true, ban_email);
    res.json({ msg });
  } catch (e) {
    res.status(400);
    res.json({ msg: "Error: " + e.message });
  }
}

async function unbanUser(req, res) {
  try {
    const { unban_email } = req.body;
    const msg = await setBanStatus(false, unban_email);
    res.json({ msg });
  } catch (e) {
    res.status(400);
    res.json({ msg: "Error: " + e.message });
  }
}

async function logAdmin(req, res) {
  const {username, password} = req.body
  try{
    const admin = await Admin.findOne({ where: { username, password } });
    if(!admin) return res.status(400).json({error: 'Usuario o contraseña incorrecta.'})
    const token = jwt.sign({isAdmin: true}, SECRET_KEY, {expiresIn: '1h'})
    res.json({token})
  } catch (e) {
    res.send({ msg: "Error: " + e.message });
  }

}

const checkUserIsAdmin = async (req, res) => {
  let token = req.headers['authorization']
  token = token.split(' ')[1]
  
  if (token !== 'null') {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {      
        if (err) {
          return res.json({ message: 'Token inválida.' });    
        } else {
          if(decoded.hasOwnProperty('isAdmin')){
            return res.json({message: 'El usuario es administrador.'})
          } else{
            return res.json({message: 'El usuario no es administrador.'})
          }
        }
      });
    } else {
      res.json({ 
          message: 'Token no proveída.' 
      });
  }
}

module.exports = { banUser, unbanUser, logAdmin, checkUserIsAdmin};
