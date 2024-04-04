const user = require("../models/user");

class User {
    async findUserByUsername(username) {
        return await user.findOne({ where: { username: username } });
    }
    async addUser(data) {
        return await user.create({
            username: data.username,
            password: data.password,
            role: data.userRole,
        });
    }
}

module.exports = new User();
