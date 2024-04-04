const cart = require("../service/cart");
const {sortSeedsValidation,numberValidator} = require("../midleware/validator");





class Cart {
    async addCart(req, res, next) {
        try {

            let body = req.body
            let result = await cart.addCart(req.body);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
}



module.exports = new Cart();