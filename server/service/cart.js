
const cart = require("../repository/cart");
const seed = require("../repository/seed");
const user = require("../repository/user")
const NotFound = require("../errors/NotFound");
const Forbidden = require("../errors/Forbidden");

class Pizza {
    async allBaskets() {
        return await basketRepo.allBaskets();
    }
    async userBaskets(userId) {
        return await basketRepo.userBaskets(userId);
    }
    async addCart(body) {
        let seedId = body.seedId
        let userId = body.userId
        let amount = body.amount
        
        let price = await seed.seedById(seedId)
        if (price == null) {
            throw new NotFound("Seed  does not exist");
        }
        price = price.dataValues.price
        
        let tmp = await user.findUserById(userId)
        console.log(tmp)
        if (tmp == null) {
            throw new NotFound("User does not exist");
        }
        // let price = await cart.findPriceofPizza(pizzaId);
        // price = price * amount;
        return await cart.addCart(
            seedId,
            userId,
            price,
            amount
        );
    }
}


module.exports = new Pizza();