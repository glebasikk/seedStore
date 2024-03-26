const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const seedPicture = sequelize.define("seedPicturies", {
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
    pictureId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});

module.exports = seedPicture;
