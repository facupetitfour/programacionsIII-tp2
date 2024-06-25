import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'
const secretKey = process.env.secretKey
class AuthController {

  async handleLogin(req, res) {
    try {
      const { username, password } = req.body;

      //Verifica si existe el usuario
      const userExist = await User.findOne({ username });

      if (userExist) {
        // Compara contraseñas guardada y ingresada por el usuario a ver si son correctas.
        const passwordboolean = await User.comparePassword(
          password,
          userExist.password
        );

        // Si existe se crea token, sino, se entrega un mensaje de error.
        if (passwordboolean) {
          const token = jwt.sign({ id: userExist._id }, secretKey, {
            expiresIn: "6h",
          });
          res.cookie("token",token,{ httpOnly: false, secure: false, sameSite: 'lax' })
          res
            .status(201)
            .json({ message: "Usuario inicio exitosamente"});
        } else {
          res
            .status(500)
            .json({ message: "Credenciales no validas, intente nuevamente" });
        }
      }else{
        res.status(404).json({message:"el usuario no existe"})
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al inicar sesion", error: error.message });
    }
  }
  async handleRegister(req, res) {
    const { username, email, password, roles } = req.body;

    try {
      // Verificar si el usuario o el correo ya existen
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "El usuario o correo ya existen." });
      }

      // Crear un usuario
      const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password), // encripto contraseña antes de crearlo
      });

      // Asignar roles al usuario
      // if (roles) {
      //   const foundRoles = await Role.find({ name: { $in: roles } });
      //   newUser.roles = foundRoles.map(role => role._id);
      // } else {
      //   const role = await Role.findOne({ name: "user" });
      //   newUser.roles = [role._id];
      // }

      // Guardar el usuario nuevo
      const savedUser = await newUser.save();

      // Genero token
      jwt.sign({ id: savedUser._id }, secretKey, {expiresIn: "6h"},
        (err,token)=>{
          if(err) throw err
          res.cookie("token",token,{ httpOnly: false, secure: false, sameSite: 'lax' })
          res.status(201).json({ message: "Usuario registrado exitosamente"});
        });


    } catch (error) {
      res.status(500).json({
        message: "Error al registrar el usuario",
        error: error.message,
      });
    }
  }
  async handleLogOut(req, res) {
    res.cookie("token", "", {expires: new Date(0)});
    res.sendStatus(200)
  }
  async handleChangePasswordWhithOldPassword(req,res){
    try {
      const {passwordOld, passwordNew} = req.body
      const {token} = req.cookies
      const userID = jwt.decode(token)
      const userExist = await User.findById(userID.id)
      const passwordboolean = await User.comparePassword(
        passwordOld,
        userExist.password
      );

      if (passwordboolean) {
        userExist.password = await User.encryptPassword(passwordNew)
        await userExist.save();
        res.status(200).json({message: "Contraseña actualizada correctamente"})
      }else{
        throw error
      }

    } catch (error) {
      res.status(400).json({message: error.message})
    }


  }
  async handleChangePasswordWhithCodeEmail(req,res){
    const {validateCode, passwordNew} = req.body
  }

  async handleValidateEmail(req,res){

  }

}

export default AuthController;
