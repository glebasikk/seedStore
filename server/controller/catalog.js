const catalog = require("../service/catalog");
const Response = require("../help/Response");
const {delSeedValidation} = require("../midleware/validator");



class Catalog {
    async addFile (req, res,next){
        try{
            let {value, error} = delSeedValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await catalog.addFile(value,req.file)
            return res.status(200).json(result);
        }catch (e) {
            next(e);
        }
    }
    async downloadCatalog(req,res,next){
        try{
            let {value, error} = delSeedValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await catalog.downloadFile(value)
            return res.status(200).sendFile(result);
        }catch (e) {
            next(e);
        }
    }
}




module.exports = new Catalog();