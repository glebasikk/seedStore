const additionalInformation = require("../repository/additionalInformation");
const InrenalServerError = require("../errors/InrenalServerError")



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
    async addAdditionalInfoExtended(body){
        let seedId = body.seedId
        let title = body.title
        let content = body.content
        let tmp
        let result = []
        if(title.length != content.length){
            throw new InrenalServerError("title.length != content.length");
        }
        for (let i = 0; i<title.length; i++){
                tmp = await additionalInformation.addAdditionalInfo(seedId,title[i],content[i])
                result.push(tmp.dataValues)
        }
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
    async delAdditionalInfoBySeedId(body){
        let seedId = body.seedId
        let result = await additionalInformation.delAdditionalInfoBySeedId(seedId)
        return result
    }

}


module.exports = new AdditionalInformation();


                