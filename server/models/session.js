const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const session = sequelize.define("sessions", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = session;
