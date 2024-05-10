const jwt = require("jsonwebtoken");
const { secret } = require("../config");
class TokenGenerator {
     generateToken(data){
        const payload = {
            id: data.dataValues.id,
            username: data.dataValues.username,
            role: data.dataValues.role,
            type: "Access"
        };
        
        return jwt.sign(payload, secret, { expiresIn: "24h" });
    };
    
    
     generateRefreshToken(data){
        const payload = {
            id: data.dataValues.id,
            username: data.dataValues.username,
            role: data.dataValues.role,
            type: "Refresh"
        };
        return jwt.sign(payload, secret, { expiresIn: "72h" });
    };
}
module.exports = new TokenGenerator();