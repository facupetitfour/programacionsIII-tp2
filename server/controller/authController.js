import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

class AuthController {
  async handleLogin(req, res) {
    try {
      
      const {username, password} = req.body

      //Verifica si existe el usuario
      const userExist = await User.findOne({username})
      
      if (userExist) {

        // Compara contraseñas guardada y ingresada por el usuario a ver si son correctas. 
        const passwordboolean = await User.comparePassword(password,userExist.password)
        
        // Si existe se crea token, sino, se entrega un mensaje de error.
        if (passwordboolean) {

          const token = jwt.sign({ id: userExist._id }, "secretkey", { expiresIn: '6h' });
          res.status(201).json({ message: "Usuario inicio exitosamente", token: token });

        } else{
          res.status(500).json({message:"Credenciales no validas, intente nuevamente"})
        }
      } 
    } catch (error) {
      res.status(500).json({message:"Error al inicar sesion", error: error.message})
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
      const token = jwt.sign({ id: savedUser._id }, "secretkey", { expiresIn: '6h' });

      res.status(201).json({ message: "Usuario registrado exitosamente", token: token });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al registrar el usuario",
          error: error.message,
        });
    }
  }
}

export default AuthController;
