const seedPicture = require("../models/seedPicture");
const picture = require("../models/picture");
const { Op } = require('sequelize')


class Picture {
    async seedPictures(id) {
        console.log(id)
        return await picture.findAll({
            where: {
                id: id,
            },
        });
    }

    async seedPicture(id) {
        console.log(id)
        return await picture.findOne({
            where: {
                id: id,
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
}





module.exports = new Picture();