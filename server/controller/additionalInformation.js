const additionalInformation = require("../service/additionalInformation");
const Response = require("../help/Response");
const {seedCategoriesValidator,addAdditionalInfoValidator,deladditionaiInfoValidator} = require("../midleware/validator");





class AdditionalInformation {
    async addAdditionalInfo(req,res,next){
        try{
            let {value, error} = addAdditionalInfoValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await additionalInformation.addAdditionalInfo(value)
            return res.status(200).json(result);
            
        }catch (e) {
            next(e);
        }
    }
    async delAdditionalInfo(req,res,next){
        try{
            let {value, error} = deladditionaiInfoValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await additionalInformation.delAdditionalInfo(value)
            if (result>0){
                return res.status(200).json(new Response("200", "Initial values deleted successfully"));
            }
            return res.status(200).json(new Response("200", "The initial value not exist"));
            
        }catch (e) {
            next(e);
        }
    }
    async additionalInfoOfCurrentSeed(req,res,next){
        try{
            let {value, error} = seedCategoriesValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await additionalInformation.additionalInfoOfCurrentSeed(value)
            return res.status(200).json(result);     
        }catch (e) {
            next(e);
        }
    }
}


module.exports = new AdditionalInformation();