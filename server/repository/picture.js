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
        console.log(filename)
        return await picture.create({
            seedId:seedId,
            picture:filename
        })
    }
}





module.exports = new Picture();