const seed = require("../service/seed");
const {sortSeedsValidation,numberValidator} = require("../midleware/validator");





class Seed {
    async sortSeeds(req, res, next) {
        try {
            let {value, error} = sortSeedsValidation.validate(req.body)
            if (error){
                return res.status(422).json(error)
            } 
            let query = await numberValidator.validateAsync(req.query)
            let result = await seed.sortSeeds(query,value);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
    async addSeed (req,res,next){
        try{
            let result = await seed.addSeed(req.body);
            return res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }
    async updateSeed (req,res,next){
        try{
            let result = await seed.updateSeed(req.body);
            return res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }
    async delSeed (req,res,next){
        try{
            let result = await seed.delSeed(req.body);
            return res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }
}


module.exports = new Seed();
