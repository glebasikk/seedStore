const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const cart = sequelize.define(
    "carts",
    {
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
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }
);

module.exports = cart;
