const cart = require("../service/cart");
const Response = require("../help/Response");
const {sortSeedsValidation,numberValidator,seedCategoriesValidator,addCartValidator,emptyValidator, delSeedValidation} = require("../midleware/validator");
const nodemailer = require('nodemailer');




class Cart {
    async mail (req,res,next){


        
        let testEmailAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "seedstrore@gmail.com",
                pass: "administrator!1",
            },
        });
        let result = await transporter.sendMail({
            from: "seedstrore@gmail.com",
            to: "seedstrore@gmail.com",
            subject: 'Message from Node js',
            text: 'This message was sent from Node js server.',
            html:
                'This <i>message</i> was sent from <strong>Node js</strong> server.',
        });
        console.log(result);
        return result

    }


    async addCart(req, res, next) {
        try {

            let {value, error} = addCartValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await cart.addCart(value);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
    async userCart(req,res,next){
        try{
            let {value, error} = emptyValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await cart.userCart(value)
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
    async deleteCart(req,res,next){
        try{
            let {value, error} = delSeedValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await cart.deleteCart(value)
            if (result>0){
                return res.status(200).json(new Response("200", "Initial values deleted successfully"));
            }
            return res.status(200).json(new Response("200", "The initial value not exist"));
        } catch (e) {
            next(e);
        }
    }
    async updateCart(req,res,next){
        try{
            let {value, error} = delSeedValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await cart.updateCart(value)
            if (result>0){
                return res.status(200).json(new Response("200", "Initial values updated successfully"));
            }
            return res.status(200).json(new Response("200", "The initial not updated"));
        } catch (e) {
            next(e);
        }
    }
}



module.exports = new Cart();