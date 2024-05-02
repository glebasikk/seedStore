const catalog = require("../models/catalog");
const { Op } = require('sequelize')


class Catalog {
    async addFile(id,filename){
        return await catalog.create({
            id:id,
            catalog:filename
        })
    }
    async delFile(id){
        return await catalog.destroy({
            where:{
                id:id
            }
        })
    }
    async fileById(id) {
        return await catalog.findAll({
            where: {
                id: id,
            },
        });
    }
}





module.exports = new Catalog();