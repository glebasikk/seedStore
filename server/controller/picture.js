const picture = require("../service/picture");
const {seedCategoriesValidator} = require("../midleware/validator");





class Picture {
    async seedPicturies(req,res,next){
        try{
            let {value, error} = seedCategoriesValidator.validate(req.body)
            if (error){
                return res.status(422).json(error)
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
                return res.status(422).json(error)
            }
            let result = await picture.seedFirstPicture(value)
            return res.status(200).json(result);
            
        }catch (e) {
            next(e);
        }
    }
}


module.exports = new Picture();