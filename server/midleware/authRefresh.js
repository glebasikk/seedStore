const { secret } = require("../config");
const jwt = require("jsonwebtoken");
const Unauthorized = require("../errors/Forbidden");


module.exports = function (role) {
    return function (req, res, next) {
        try {
            let token = req.headers.authorization
            console.log(token)
            if (!token) {
                throw new Unauthorized("access denied");
            }
            token = token.split(" ")[1];
            const data = jwt.verify(token, secret);
            if (data.type != "Refresh"){
                throw new Unauthorized("Wrong token type")
            }
            req.body.userId = data.id
            req.body.username = data.username
            req.body.role = data.role
            req.body.type = data.type
            next();
        } catch (e) {
            console.log(e);
            next(e);
        }
    };
};
