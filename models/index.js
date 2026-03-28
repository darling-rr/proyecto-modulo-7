const sequelize = require("../config/database");
const User = require("./User");
const Order = require("./Order");

User.hasMany(Order, {
  foreignKey: "userId",
  as: "pedidos"
});

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "usuario"
});

module.exports = {
  sequelize,
  User,
  Order
};