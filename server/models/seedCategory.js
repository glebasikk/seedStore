const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const seedCategory = sequelize.define("seedCategories", {
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
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});

module.exports = seedCategory;
