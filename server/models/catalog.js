const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const catalog = sequelize.define("catalogs", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    catalog: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = catalog;
