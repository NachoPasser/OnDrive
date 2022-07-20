const nodemailer = require("nodemailer");
const { User } = require("../Models/User");
const { findUserById, findUserByEmail } = require("../Models/utils/Finders");
const {
  generateRecoveryCode,
  compareRecoveryCode,
  resetCode,
} = require("../Models/utils/Password");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

let timeout = null;

const recoverPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail({ email, model: true });

    if (!user) {
      return res
        .status(404)
        .json({ error: "No existe un usuario registrado con ese Mail" });
    }

    //si tengo un codigo no permito generar otro
    if (user["recovery"] !== null)
      return res
        .status(404)
        .json({ error: "Espere 5 minutos para solicitar otro codigo" });

    const code = generateRecoveryCode();
    const hashCode = await bcrypt.hash(code, 10);
    user.set({ recovery: hashCode });
    await user.save();

    timeout = resetCode({ user, mins: 5 }); //permitir nuevo codigo en 5 mins

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
      from: '"OnDrive" <ondrive.staff@gmail.com>',
      to: email,
      subject: "Recuperación de contraseña",
      text: `Hola ${user.name} ${user.last_name}.`,
      html: `<p>
      Codigo de recuperacion: <strong>${code}</strong>
      <br>
      <p>Este codigo se autodestruira en <strong>5 minutos</strong> 💣</p>
      <br>
      <br>
      🙋 Saludos, el equipo de OnDrive. 
      </p>`,
    };
    transporter.sendMail(mailOptions, function (error) {
      error ? console.error(error) : console.log(`📫 Mail enviado a ${email}`);
    });
    res.json({ message: "Mail enviado, revisa tu correo" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const changePass = async (req, res) => {
  try {
    const { token } = req.params;
    let id = 0;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválida." });
      } else {
        id = decoded.id;
      }
    });
    const { password } = req.body;
    const user = await findUserById({ user_id: id, model: true });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;
    await user.save();
    res.json({ message: "Contraseña cambiada" });
  } catch (e) {
    res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
};

const verifyRecoveryCode = async (req, res) => {
  try {
    const { code, email } = req.body;
    if (!code || !email)
      return res.status(400).json({ error: "Faltan datos(Email o Codigo)" });
    // validar codigo con el de la db
    const [valid, id] = await compareRecoveryCode({ email, code, timeout });
    if (!valid)
      return res.status(400).json({ error: "Codigo invalido o caducado" });

    //devolver token de acceso si es valido
    const token = jwt.sign({ id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token }); //return token JWT
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  recoverPassword,
  changePass,
  verifyRecoveryCode,
};
