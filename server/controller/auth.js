const authService = require("../service/auth");
const Response = require("../help/Response");
const { 
    registrationAndAuthValidation,
    refreshTokenValidator,
    changePasswordValidation 
} = require("../midleware/validator")

class Auth {
    async registration(req, res, next) {
        try {
            let data = req.body
            let validation = await registrationAndAuthValidation.validateAsync(data)
            let response = await authService.registration(data);
            return res.status(200).json(new Response("200", "registration complete"));
        } catch (e) {
            if(e.isJoi == true){
                e.status = 422
            }
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            let {value, error} = registrationAndAuthValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            } 
            let response = await authService.login(value);
            return res.status(200).json(response);
        } catch (e) {
            if(e.isJoi ==true){
                e.status = 422
            }
            next(e);
        }
    }
    async changePassword(req, res, next) {
        try {
            let {value, error} = changePasswordValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            } 
            let response = await authService.changePassword(value);

            return res.status(200).json(new Response("200", "Password successfully updated"));
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
            return res.status(200).json(response);
        } catch (e) {
            if(e.isJoi ==true){
                e.status = 422
            }
            next(e);
        }
    }
}

module.exports = new Auth();
