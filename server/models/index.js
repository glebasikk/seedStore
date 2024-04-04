const seed = require("./seed");
const basket = require("./basket");
const category = require("./category");
const order = require("./order");
const picture = require("./picture");
const seedCategory = require("./seedCategory");
const cart = require("./cart");
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
meetings.belongsTo(cart);


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