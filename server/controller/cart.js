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
    async userCart(req,res,next){
        try{
            let body = req.body
            let result = await cart.userCart(body)
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
    async deleteCart(req,res,next){
        try{
            let body = req.body
            let result = await cart.deleteCart(body)
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
    async updateCart(req,res,next){
        try{
            let body = req.body
            let result = await cart.updateCart(body)
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
}



module.exports = new Cart();