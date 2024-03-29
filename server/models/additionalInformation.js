const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const additionalInformation = sequelize.define("additionalInformations", {
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
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = additionalInformation;
