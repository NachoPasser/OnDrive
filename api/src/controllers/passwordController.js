const nodemailer = require("nodemailer");
const {User} = require("../Models/User");
const { isCorrectCredentials }  = require("../Models/utils/Confirmer");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const recoverPassword = async (req, res) => {
  const { email } = req.body;
  try{
    
    const [valid, user] = await isCorrectCredentials(email);
  
    if(!valid) {
      return res.status(409).json({ error: "No existe un usuario registrado con ese mail." });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 456,
      secure: true,
      auth: {
        user: "ondrive.staff@gmail.com",
        pass: "qvaficmteifpsgzw",
      },
    });
    const mailOptions = {
      from: '"Recuperación de contraseña" <ondrive.staff@gmail.com>',
      to: email,
      subject: "Recuperación de contraseña",
      text: `Hola ${user.name} ${user.last_name}, tu contraseña es: ${user.password}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send("Email enviado");
    
  } catch(e){
    res.status(400).json({ error: `${e.message}` });
  }
};

const changePass = async (req, res) => {
  const { token } = req.params;
  let id = 0;
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.json({ message: "Token inválida." });
    } else {
      id = decoded.id;
    }
  });
  const { password } = req.body;
  const user = await User.findOne({
    where: {
      user_id: id,
    },
  });
  if (!user) {
    return res.status(400).send("Usuario no encontrado");
  }
  user.password = password;
  await user.save();
  res.send("Contraseña cambiada");
};

module.exports = {
  recoverPassword,
  changePass,
};
