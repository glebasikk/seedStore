const cart = require("../models/cart");

class Carts {
    async findCartByUserIdAndSeedId(id) {
        return await cart.findAll({
            where:{
                id:id
            }
        });
    }

    async userCart(userId) {
        return await cart.findAll({ where: { userId: userId } });
    }

    async addCart(seedId, userId, price, amount) {
        return await cart.create({
            seedId: seedId,
            userId: userId,
            amount: amount,
            price: price,
        });
    }

    async findCartByUserIdAndSeedId(userId, seedId) {
        return await cart.findOne({ where: 
            { 
                userId: userId,
                seedId: seedId
            } 
        });
    }

    async findCartById(id) {
        return await cart.findOne({ where: { id: id } });
    }

    async changeSeedsAmount(id,amount,price) {
        return await cart.update(
            {
                amount:amount,
                price: price
            },
            {
                where:
                {
                    id: id,
                }
            }

        );
    }

    async deleteCart(id) {
        return await cart.destroy({ where: { id: id } });
    }

    // async userAndBasket(user, basket) {
    //     return await cart.findOne({
    //         where: { user: user, basket: basket },
    //     });
    // }

    // async findPriceofPizza(user, basket) {
    //     return await cart.sum("price", {
    //         where: { user: user, basket: basket },
    //         attributes: ["price"],
    //     });
    // }
    // async findUserAndPizza(id, user) {
    //     return await cart.findOne({ where: { id: id, user: user } });
    // }
}

module.exports = new Carts();
