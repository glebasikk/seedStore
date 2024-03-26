const session = require("../models/sessions");

class Session {
    async delSession(data) {
        return await session.destroy({ where: { user_id: data.userId } });
    }
    async addSession(data) {
        return await session.create({
            user_id: data.userId,
            token: data.token,
            rtoken: data.refreshToken,
        });
    }
    async findSession(data) {
        return await session.findOne({ where: { token: data.token } });
    }
}

module.exports = new Session();
