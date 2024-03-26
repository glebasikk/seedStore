const { secret } = require("../config");
const session = require("../repository/sessions");
const jwt = require("jsonwebtoken");
const Unauthorized = require("../errors/Forbidden");



module.exports = function (role) {
    return function (req, res, next) {
        try {

            let token = req.headers.authorization
            if (!token) {
                throw new Unauthorized("access denied");
            }
            token = token.split(" ")[1];
            const data = jwt.verify(token, secret);
            let hasRole = false;
            data.token = token
            
            req.body.userId = data.id
            if (data.type != "Access"){
                throw new Unauthorized("Wrong token type")
            }
            if (role.indexOf(data.role,0) != -1) {
                hasRole = true;
            }
            if (hasRole === false) {
                throw new Unauthorized("access denied");
            }
            next();
        } catch (e) {
            console.log(e);
            next(e);
        }
    };
};
