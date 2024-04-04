const cart = require("../models/cart");

class Carts {
    // async allBaskets() {
    //     return await cart.findAll();
    // }

    async userCart(user) {
        return await cart.findAll({ where: { user: user } });
    }

    async addCart(seedId, userId, price, amount) {
        return await cart.create({
            seedId: seedId,
            userId: userId,
            amount: amount,
            price: price,
        });
    }

    async findId(id) {
        return await cart.findOne({ where: { id: id } });
    }

    // async update(id, pizzaID, amount, price, user, basket) {
    //     return await cart.update(
    //         {
    //             pizza_id: pizzaID,
    //             amount: amount,
    //             price: price,
    //             user: user,
    //             basket: basket,
    //         },
    //         { where: { id: id } }
    //     );
    // }

    // async deletePizza(id) {
    //     let x = await cart.destroy({ where: { id: id } });
    //     return await x;
    // }

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
