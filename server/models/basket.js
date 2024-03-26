const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const basket = sequelize.define("baskets", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    seedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = basket;
