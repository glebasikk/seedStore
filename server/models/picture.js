const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const picture = sequelize.define("picturies", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    seedId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = picture;
