const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const order = sequelize.define("orders", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = order;
