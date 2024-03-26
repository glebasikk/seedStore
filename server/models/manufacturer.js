const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const manufacturer = sequelize.define("manufacturers", {
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
    priority: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = manufacturer;
