const path = require("path");

const homeController = {
  index: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  }
};

module.exports = homeController;