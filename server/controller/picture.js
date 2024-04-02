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
            return res.status(200).sendFile(result);
            
        }catch (e) {
            next(e);
        }
    }
    async downloadPicture(req,res,next){
        try{
            let body = req.query
            console.log()
            let result = await picture.downloadPicture(body)
            return res.status(200).sendFile(result);
            
        }catch (e) {
            next(e);
        }
    }

    async addPicture (req, res,next){
        try{
            
            let file = req.file
          
            if (req.file == undefined) {
                return res.status(200).send(`You must select a file.`);
            }
            let {value, error} = seedCategoriesValidator.validate(req.body)
            if (error){
                return res.status(422).json(error)
            }
            console.log(file)
            let result = await picture.addPicture(value,file)
            return res.status(200).json(result);
            
        }catch (e) {
            next(e);
        }
    }
    async delPicture (req, res,next){
        try{
            let body = req.body
            let result = await picture.delPicture(body)
            return res.status(200).json(result);
            
        }catch (e) {
            next(e);
        }
    }
    async updatePicture (req, res,next){
        try{
            let file = req.file
            if (req.file == undefined) {
                return res.status(200).send(`You must select a file.`);
            }
            let body = req.body
            let result = await picture.updatePicture(body,file)
            return res.status(200).json(result);
        }catch (e) {
            next(e);
        }
    }
}


module.exports = new Picture();