const seed = require("./seed");
const basket = require("./basket");
const category = require("./category");
const order = require("./order");
const picture = require("./picture");
const manufacturer = require("./manufacturer");
const seedCategory = require("./seedCategory");
const seedPicture = require("./seedPicture");

guests.hasMany(picture, {
    foreignKey: "pictureId",
    sourceKey: "id",
});
users.belongsTo(seedPicture);


guests.hasMany(category, {
    foreignKey: "categoryId",
    sourceKey: "id",
});
meetings.belongsTo(seedCategory);


guests.hasMany(seed, {
    foreignKey: "seedId",
    sourceKey: "id",
});
meetings.belongsTo(seedCategory);


guests.hasMany(seed, {
    foreignKey: "seedId",
    sourceKey: "id",
});
meetings.belongsTo(seedPicture);


guests.hasMany(manufacturer, {
    foreignKey: "manufacturerId",
    sourceKey: "id",
});
meetings.belongsTo(seed);


guests.hasMany(seed, {
    foreignKey: "seedId",
    sourceKey: "id",
});
meetings.belongsTo(basket);


guests.hasMany(order, {
    foreignKey: "orderId",
    sourceKey: "id",
});
meetings.belongsTo(basket);