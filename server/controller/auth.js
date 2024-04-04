const authService = require("../service/auth");
const Response = require("../help/Response");
const { 
    registrationAndAuthValidation,
    refreshTokenValidator 
} = require("../midleware/validator")

class Auth {
    async registration(req, res, next) {
        try {
            let data = req.body
            console.log(data)
            let validation = await registrationAndAuthValidation.validateAsync(data)
            let response = await authService.registration(data);
            return res.json(new Response("200", "registration complete"));
        } catch (e) {
            if(e.isJoi == true){
                e.status = 422
            }
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            let data = req.body
            let validation = await registrationAndAuthValidation.validateAsync(data)
            let response = await authService.login(data);
            return res.json(response);
        } catch (e) {
            if(e.isJoi ==true){
                e.status = 422
            }
            next(e);
        }
    }
    async session(req, res, next) {
        try {
            let response = await authService.session();
            return res.json(response);
        } catch (e) {
            if(e.isJoi ==true){
                e.status = 422
            }
            next(e);
        }
    }
}

module.exports = new Auth();
