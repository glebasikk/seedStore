const seed = require("../models/seed");
const { Op } = require('sequelize')


class Seed {
    async allSeeds(page) {
        return await seed.findAndCountAll({
            offset: page,
            limit: 3,
        });
    }
    async seedExist(id) {
        return await seed.count({
            where: {
                id: id
            }
        });
    }
    async allSeedsByName(page,substring) {
        return await seed.findAndCountAll({
            where: {
                name: {
                    [Op.substring]: substring
                }
            },
            offset: page,
            limit: 3,
        });
    }
    async allSeedsByCategory(page,seedId) {
        return await seed.findAndCountAll({
            where: {
                id: seedId
            },
            offset: page,
            limit: 3,
        });
    }
    async allSeedsByNameAndCategory(page,substring,seedId) {
        return await seed.findAndCountAll({
            where: {
                name: {
                    [Op.substring]: substring
                },
                id: seedId
            },
            offset: page,
            limit: 3,
        });
    }
    
}

module.exports = new Seed();