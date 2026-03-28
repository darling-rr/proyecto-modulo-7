const { User } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }
    });

    res.json({
      status: "success",
      message: "Usuarios obtenidos correctamente",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener usuarios",
      error: error.message
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    res.json({
      status: "success",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nombre, email, password, edad } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Nombre, email y password son obligatorios"
      });
    }

    const user = await User.create({
      nombre,
      email,
      password,
      edad
    });

    const { password: _, ...userData } = user.toJSON();

    res.status(201).json({
      status: "success",
      message: "Usuario creado correctamente",
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    await user.update(req.body);

    const { password: _, ...userData } = user.toJSON();

    res.json({
      status: "success",
      message: "Usuario actualizado",
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    await user.destroy();

    res.json({
      status: "success",
      message: "Usuario eliminado"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};
