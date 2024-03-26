const category = require("../service/category");
const {seedCategoriesValidator} = require("../midleware/validator");





class Category {
    async seedCategories(req,res,next){
        try{
            let {value, error} = seedCategoriesValidator.validate(req.body)
            if (error){
                return res.status(422).json(error)
            }

            let result = await category.seedCategories(value)
            return res.status(200).json(result);
            
        }catch (e) {
            next(e);
        }
    }
}


module.exports = new Category();