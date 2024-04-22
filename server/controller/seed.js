const seed = require("../service/seed");
const Response = require("../help/Response");
const {
    sortSeedsValidation,
    numberValidator,
    addSeedValidation,
    updateSeedValidation,
    delSeedValidation,
    seedCategoriesValidator,
} = require("../midleware/validator");





class Seed {
    async sortSeeds(req, res, next) {
        try {
      
            let {value, error} = sortSeedsValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            } 
            let query = await numberValidator.validateAsync(req.query)
            let result = await seed.sortSeeds(query,value);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
    async seedAllInfo(req, res, next) {
        try {
            let {value, error} = seedCategoriesValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            } 
            let result = await seed.seedAllInfo(value);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
    
    async addSeed (req,res,next){
        try{

            let {value, error} = addSeedValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            } 
            let result = await seed.addSeed(value);
            if(result == true){
                return res.json(new Response("200", "Value successfully added"));
            }
        }
        catch(e){
            next(e);
        }
    }
    
    async addSeedAllInfo (req,res,next){
        try{
            let value = req.body
            let result = await seed.addSeedAllInfo(value);
            return res.status(200).json(result)
        }
        catch(e){
            next(e);
        }
    }
    async updateSeed (req,res,next){
        try{
            let {value, error} = updateSeedValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            } 
            let result = await seed.updateSeed(value);
            if (result==true){
                return res.status(200).json(new Response("200", "Initial value updated successfully"));
            }
            return res.status(200).json(new Response("200", "The initial value is equal to the changed value"));
        }
        catch(e){
            next(e);
        }
    }
    async delSeed (req,res,next){
        try{
            let {value, error} = delSeedValidation.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            } 
            let result = await seed.delSeed(value);
            if (result==true){
                return res.status(200).json(new Response("200", "Initial value deleted successfully"));
            }
            return res.status(200).json(new Response("200", "The initial value not exist"));
        }
        catch(e){
            next(e);
        }
    }
}


module.exports = new Seed();
