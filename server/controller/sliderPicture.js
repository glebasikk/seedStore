const sliderPicture = require("../service/sliderPicture");
const Response = require("../help/Response");
const {delSeedValidation,emptyValidator} = require("../midleware/validator");

//sliderPicture
//Picture

class Catalog {
    async allPicturies (req, res,next){
        try{
            let {value, error} = emptyValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await sliderPicture.allPicturies()
            return res.status(200).json(result);
        }catch (e) {
            next(e);
        }
    }
    async addPicture (req, res,next){
        try{
            // let {value, error} = emptyValidator.validate(req.body)
            
            // if (error){
            //     return res.status(4211).json(new Response("422", error.details));
            // }
            let result = await sliderPicture.addPicture(req.body,req.file)
            return res.status(200).json(result);
        }catch (e) {
            next(e);
        }
    }
    async downloadPicture(req,res,next){
        try{
            let {value, error} = delSeedValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await sliderPicture.downloadPicturies(value)
            return res.status(200).download(result);
        }catch (e) {
            next(e);
        }
    }
    async delPicture(req,res,next){
        try{
            let {value, error} = delSeedValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await sliderPicture.delPicture(value)
            return res.status(200).json(new Response("200", "Picture successfully deleted"));
        }catch (e) {
            next(e);
        }
    }
}




module.exports = new Catalog();