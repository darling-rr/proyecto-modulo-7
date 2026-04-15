const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email y password son obligatorios"
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales inválidas"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales inválidas"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
      }
    );

    res.json({
      status: "success",
      message: "Login exitoso",
      data: {
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al iniciar sesión",
      data: error.message
    });
  }
};
