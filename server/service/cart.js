
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
        let seedId = body.seedId

        let tmp = await user.findUserById(userId)
        if (tmp == null) {
            throw new NotFound("User does not exist");
        }   
        let cartData = await cart.findCartById(id)
        if (cartData == null) {
            throw new NotFound("Cart does not exist");
        }  
        let seedData = await seed.seedById(cartData.dataValues.seedId)
        if (seedId != undefined) {

            tmp = await seed.seedById(seedId)
            if (tmp == null){
                throw new NotFound("New seed does not exist");
            }
            let price = tmp.dataValues.price * amount;
            let result =  cart.changeCartSeed(id,seedId,amount,price);
            return result[0]
        }  
        let price = seedData.dataValues.price * amount;
        return await cart.changeSeedsAmount(id,amount,price)[0];
    }
}


module.exports = new Cart();