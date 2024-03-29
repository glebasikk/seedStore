const additionalInformation = require("../models/additionalInformation");



class AdditionalInformation {
    async additionalInfoOfCurrentSeed(seedId) {

        return await additionalInformation.findAll({
            //attributes: ['seedId'],
            where: {
                seedId: seedId,
            },
        });
    }
    async addAdditionalInfo(seedId, title, content) {
        return await additionalInformation.create({
                seedId: seedId,
                title: title,
                content: content
        });
    }
    async delAdditionalInfoBySeedIdAndTitle(seedId,title) {
        return await additionalInformation.destroy({
            where: {
                seedId: seedId,
                title: title
            },
        });
    }
    async delAdditionalInfoBySeedId(seedId) {
        return await additionalInformation.destroy({
            where: {
                seedId: seedId,
            },
        });
    }
}

module.exports = new AdditionalInformation();