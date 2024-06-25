import User from "../models/userSchema.js";
// import jwt from 'jsonwebtoken';

class UserController {
  // Obtener todos los usuarios
  async handleGetAllItems(req, res) {
    try {
      const users = await User.find()
      // .populate('roles');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
    }
  }

  // Obtener un usuario por ID
  async handleGetItem(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id)
      // .populate('roles');
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
    }
  }

  // Crear un nuevo usuario
  async handleCreateItem(req, res) {
    try {
      const { username, email, password, /*role*/} = req.body;

      // Verificar si el usuario o el correo ya existen
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: "El usuario o correo ya existen." });
      }

      // Crear un nuevo usuario con la contraseña encriptada
      const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
      });

      // Asignar roles al usuario
      // if (roles) {
      //   const foundRoles = await Role.find({ name: { $in: roles } });
      //   newUser.roles = foundRoles.map(role => role._id);
      // } else {
      //   const role = await Role.findOne({ name: "user" });
      //   newUser.roles = [role._id];
      // }

      // Guardar el nuevo usuario en la base de datos
      const savedUser = await newUser.save();

      res.status(201).json({ message: "Usuario creado exitosamente"});
    } catch (error) {
      res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
    }
  }

  // Eliminar un usuario por ID
  async handleDeleteItem(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
    }
  }

  // Actualizar un usuario por ID
  async handleUpdateItem(req, res) {
    try {
      const { id } = req.params;
      const { username, email, password, roles } = req.body;

      // Buscar y actualizar el usuario
      const updatedUser = await User.findById(id);
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Actualizar los campos
      if (username) updatedUser.username = username;
      if (email) updatedUser.email = email;
      if (password) updatedUser.password = await User.encryptPassword(password);
      // if (roles) {
      //   const foundRoles = await Role.find({ name: { $in: roles } });
      //   updatedUser.roles = foundRoles.map(role => role._id);
      // }

      // Guardar los cambios
      await updatedUser.save();

      res.status(200).json({ message: "Usuario actualizado exitosamente", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
  }
}

export default UserController;
