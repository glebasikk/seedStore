const seed = require("../repository/seed");
const category = require("../repository/category")
const picture = require("../repository/picture")



class Category {
    async seedCategories(body){
        let seedId = body.seedId
        let tmpMas = []
        let result = await category.seedCategoriesId(seedId)
        for (let i = 0; i<result.length; i++){
            tmpMas.push(result[i].dataValues.categoryId)
        }
        result = await category.seedCategories(tmpMas)
        return result
    }

}










module.exports = new Category();


                