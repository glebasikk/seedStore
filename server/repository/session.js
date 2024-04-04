const session = require("../models/session");

class Session {
    async delSession(data) {
        return await session.destroy({ 
            where: { 
                userId: data.userId 
            } 
        });
    }
    async addSession(data) {
        return await session.create({
            userId: data.userId,
            token: data.token
        });
    }
    async findSession(data) {
        return await session.findOne({ 
            where: {
                 token: data.token 
                } 
            });
    }
}

module.exports = new Session();
