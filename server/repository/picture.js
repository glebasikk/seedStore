const picture = require("../models/picture");
const { Op } = require('sequelize')


class Picture {
    async seedPictures(seedId) {
        console.log(seedId)
        return await picture.findAll({
            
            where: {
                seedId: seedId,
            },
        });
    }
    async allPictures() {
        return await picture.findAll({});
    }
    async pictureByName(img) {
        return await picture.count({
            
            where: {
                picture: img,
            },
        });
    }

    async seedOnePicture(seedId) {
        return await picture.findOne({
            attributes: ['picture'],
            where: {
                seedId: seedId,
            },
        });
    }

    async seedPictureId(seedId) {
        return await seedPicture.findOne({
            attributes: ['pictureId'],
            where: {
                seedId: seedId,
            },
        });
    }

    async seedPicturiesId(seedId) {
        return await seedPicture.findAll({
            attributes: ['pictureId'],
            where: {
                seedId: seedId,
            },
        });
    }
    async addPicture(seedId,filename){
        return await picture.create({
            seedId:seedId,
            picture:filename
        })
    }
    async delPicture(id){
        return await picture.destroy({
            where:{
                id:id
            }
        })
    }
    async pictureExist(id){
        return await picture.count({
            where:{
                id:id
            }
        })
    }
    async pictureById(id){
        return await picture.findOne({
            where:{
                id:id
            }
        })
    }
    async updatePicture(id,filename){
        return await picture.update({
            picture:filename
            
        },
        {
            where:{
                id:id
            }
        }
        )
    }
}





module.exports = new Picture();