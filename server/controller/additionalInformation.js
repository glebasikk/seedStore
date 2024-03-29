const additionalInformation = require("../service/additionalInformation");
const {seedCategoriesValidator} = require("../midleware/validator");





class AdditionalInformation {
    async addAdditionalInfo(req,res,next){
        try{
            let result = await additionalInformation.addAdditionalInfo(req.body)
            return res.status(200).json(result);
            
        }catch (e) {
            next(e);
        }
    }
    async delAdditionalInfo(req,res,next){
        try{
            let result = await additionalInformation.delAdditionalInfo(req.body)
            return res.status(200).json(result);
            
        }catch (e) {
            next(e);
        }
    }
    async additionalInfoOfCurrentSeed(req,res,next){
        try{
            let result = await additionalInformation.additionalInfoOfCurrentSeed(req.body)
            return res.status(200).json(result);     
        }catch (e) {
            next(e);
        }
    }
}


module.exports = new AdditionalInformation();