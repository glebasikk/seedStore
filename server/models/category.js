const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const category = sequelize.define("categories", {
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
    }
});

module.exports = category;
