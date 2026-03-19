const statusController = {
  status: (req, res) => {
    res.status(200).json({
      status: "ok",
      message: "Servidor funcionando correctamente",
      data: {
        uptime: process.uptime(),
        fecha: new Date().toLocaleString()
      }
    });
  }
};

module.exports = statusController;