const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const statusController = require("../controllers/statusController");
const usersRouter = require("./users");
const { User, Order } = require("../models");
const authRoutes = require("./authRoutes");
const uploadRoutes = require("./uploadRoutes");

router.use("/", authRoutes);
router.use("/", uploadRoutes);
router.get("/", homeController.index);
router.get("/status", statusController.status);
router.use("/usuarios", usersRouter);
router.get("/usuarios", async (req, res) => {
  try {
    const { nombre } = req.query;

    const where = {};
    if (nombre) {
      where.nombre = nombre;
    }

    const usuarios = await User.findAll({
      where,
      attributes: { exclude: ["password"] }
    });

    res.json({
      status: "success",
      message: "Usuarios obtenidos correctamente",
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener usuarios",
      data: error.message
    });
  }
});

router.post("/usuarios", async (req, res) => {
  try {
    const { nombre, email, password, edad } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Nombre, email y password son obligatorios",
        data: null
      });
    }

    const existeUsuario = await User.findOne({ where: { email } });

    if (existeUsuario) {
      return res.status(400).json({
        status: "error",
        message: "El email ya está registrado",
        data: null
      });
    }

    const nuevoUsuario = await User.create({
      nombre,
      email,
      password,
      edad
    });

    res.status(201).json({
      status: "success",
      message: "Usuario creado correctamente",
      data: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        edad: nuevoUsuario.edad
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear usuario",
      data: error.message
    });
  }
});

router.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad } = req.body;

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
        data: null
      });
    }

    await usuario.update({ nombre, edad });

    res.json({
      status: "success",
      message: "Usuario actualizado correctamente",
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        edad: usuario.edad
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al actualizar usuario",
      data: error.message
    });
  }
});

router.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
        data: null
      });
    }

    await usuario.destroy();

    res.json({
      status: "success",
      message: "Usuario eliminado correctamente",
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al eliminar usuario",
      data: error.message
    });
  }
});

router.post("/pedidos", async (req, res) => {
  try {
    const { descripcion, total, userId } = req.body;

    const usuario = await User.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado para asociar el pedido",
        data: null
      });
    }

    const pedido = await Order.create({
      descripcion,
      total,
      userId
    });

    res.status(201).json({
      status: "success",
      message: "Pedido creado correctamente",
      data: pedido
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear pedido",
      data: error.message
    });
  }
});

router.get("/usuarios/:id/pedidos", async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Order,
          as: "pedidos"
        }
      ]
    });

    if (!usuario) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
        data: null
      });
    }

    res.json({
      status: "success",
      message: "Usuario con pedidos obtenido correctamente",
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener usuario con pedidos",
      data: error.message
    });
  }
});






module.exports = router;