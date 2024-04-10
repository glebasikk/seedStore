const picture = require("../service/picture");
const Response = require("../help/Response");
const {seedCategoriesValidator, imgNameValidator, delSeedValidation,updateImgNameValidator} = require("../midleware/validator");



class Picture {
    async seedPicturies(req,res,next){
        try{
            let {value, error} = seedCategoriesValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await picture.seedPictures(value)
            return res.status(200).json(result);
            
        }catch (e) {
            next(e);
        }
    }
    async seedFirstPicture(req,res,next){
        try{
            let {value, error} = seedCategoriesValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await picture.seedFirstPicture(value)
            return res.status(200).sendFile(result);
            
        }catch (e) {
            next(e);
        }
    }
    async downloadPicture(req,res,next){
        try{
            let {value, error} = imgNameValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await picture.downloadPicture(value)
            return res.status(200).sendFile(result);
        }catch (e) {
            next(e);
        }
    }

    async addPicture (req, res,next){
        try{
            
            let {value, error} = seedCategoriesValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await picture.addPicture(value,req.file)
            return res.status(200).json(result);
        }catch (e) {
            next(e);
        }
    }
    async delPicture (req, res,next){
        try{
            let {value, error} = delSeedValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await picture.delPicture(value)
            if (result==true){
                return res.status(200).json(new Response("200", "Initial file deleted successfully"));
            }
            return res.status(200).json(new Response("200", "The initial file not exist"));
            
        }catch (e) {
            next(e);
        }
    }
    async updatePicture (req, res,next){
        try{
            let {value, error} = updateImgNameValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await picture.updatePicture(value,req.file)
            if (result==true){
                return res.status(200).json(new Response("200", "Initial file updated successfully"));
            }
            return res.status(500).json(new Response("500", "Error"));
        }catch (e) {
            next(e);
        }
    }
}


module.exports = new Picture();