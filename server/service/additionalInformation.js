const additionalInformation = require("../repository/additionalInformation");

class AdditionalInformation {
    async additionalInfoOfCurrentSeed(body){
        let seedId = body.seedId
        let result = await additionalInformation.additionalInfoOfCurrentSeed(seedId)
        return result
    }
    async addAdditionalInfo(body){
        let seedId = body.seedId
        let title = body.title
        let content = body.content
        let result = await additionalInformation.addAdditionalInfo(seedId,title,content)
        return result
    }
    async delAdditionalInfo(body){
        let seedId = body.seedId
        let title = body.title
        if (title === undefined){
            return await additionalInformation.delAdditionalInfoBySeedId(seedId)
        }
        let result = await additionalInformation.delAdditionalInfoBySeedIdAndTitle(seedId,title)
        return result
    }

}


module.exports = new AdditionalInformation();


                