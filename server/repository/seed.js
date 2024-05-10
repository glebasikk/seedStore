const seed = require("../models/seed");
const { Op,Fn  } = require('sequelize')
const sequelize = require('sequelize')
class Seed {
    async addSeed(name,info,price,manufdcturerId){

        return await seed.create({
            name:name,
            info: info,
            price: price,
            manufdcturerId
        })
    }
    async delSeed(id){
        return await seed.destroy({
            where: {
                id:id
            }
        })
    }
    async updateSeed(id,name,info,price,manufdcturerId){
        return await seed.update(
            {
                name:name,
                info: info,
                price: price,
                manufdcturerId,
            },
            {
                where:{
                    id: id
                }
            }

        )
    }


    async allSeeds(page) {
        return await seed.findAndCountAll({
            offset: page,
            limit: 10,
        });
    }

    async seedById(id) {
        return await seed.findOne({
            where: {
                id: id
            }
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


    async seedByIdExtended(id) {
            return await seed.findOne({

                where: {
                    id: id
                },
                
                
            });
        }
    
}

module.exports = new Seed();