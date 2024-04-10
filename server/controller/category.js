const category = require("../service/category");
const {
    seedCategoriesValidator,
    addCategoryToSeedValidator
} = require("../midleware/validator");
const Response = require("../help/Response");




class Category {
    async listOfCategories(req,res,next){
        try{
            let result = await category.listOfCategories()
            return res.status(200).json(new Response("200", result));
            
            
        }catch (e) {
            next(e);
        }
    }
    async seedCategories(req,res,next){
        try{
            let {value, error} = seedCategoriesValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }

            let result = await category.seedCategories(value)
            return res.status(200).json(new Response("200", result));
            
            
        }catch (e) {
            next(e);
        }
    }
    async addCategoryToSeed(req,res,next){
        try{
            let {value, error} = addCategoryToSeedValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await category.addCategoryToSeed(value)
            return res.status(200).json(new Response("200", result));
        }catch (e) {
            next(e);
        }
    }
    
    async delConnectionSeedAndCategory(req,res,next){
        try{
            let {value, error} = addCategoryToSeedValidator.validate(req.body)
            if (error){
                return res.status(422).json(new Response("422", error.details));
            }
            let result = await category.delConnectionSeedAndCategory(value)
            if (result==true){
                return res.status(200).json(new Response("200", "Initial value deleted successfully"));
            }
            return res.status(200).json(new Response("200", "The initial value not exist"));
            
        }catch (e) {
            next(e);
        }
    }
}


module.exports = new Category();