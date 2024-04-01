const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const seed = sequelize.define("seeds", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    info: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = seed;
