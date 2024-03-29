const seed = require("./seed");
const basket = require("./basket");
const category = require("./category");
const order = require("./order");
const picture = require("./picture");
const manufacturer = require("./manufacturer");
const seedCategory = require("./seedCategory");
const additionalInformation = require("./additionalInformation")


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
meetings.belongsTo(picture);

guests.hasMany(seed, {
    foreignKey: "seedId",
    sourceKey: "id",
});
meetings.belongsTo(additionalInformation);


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