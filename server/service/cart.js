
const cart = require("../repository/cart");
const seed = require("../repository/seed");
const user = require("../repository/user")
const NotFound = require("../errors/NotFound");
const Forbidden = require("../errors/Forbidden");

class Cart {
    async allBaskets() {
        return await cart.allBaskets();
    }
    async userCart(body) {
        let userId = body.userId
        return await cart.userCart(userId);
    }
    async deleteCart(body) {
        let id = body.id
        return await cart.deleteCart(id);
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
        if (tmp == null) {
            throw new NotFound("User does not exist");
        }   
        tmp = await cart.findCartByUserIdAndSeedId(userId,seedId)
        if (tmp != null) {
            throw new NotFound("The current user already has this item in their cart");
        }   
        price = price * amount;
        return await cart.addCart(
            seedId,
            userId,
            price,
            amount
        );
    }
    async updateCart(body) {
        let id = body.id
        let userId = body.userId
        let amount = body.amount
        let tmp = await user.findUserById(userId)
        if (tmp == null) {
            throw new NotFound("User does not exist");
        }   
        let cartData = await cart.findCartById(id)
        if (cartData == null) {
            throw new NotFound("Cart does not exist");
        }  
        let seedData = await seed.seedById(cartData.dataValues.seedId)

        let price = seedData.dataValues.price * amount;
        return await cart.changeSeedsAmount(id,amount,price);
    }
}


module.exports = new Cart();