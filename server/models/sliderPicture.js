const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const sliderPicture = sequelize.define("sliderPicturies", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = sliderPicture;
