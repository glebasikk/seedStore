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
    async addCategoryToSeed(body){
        let seedId = body.seedId
        let categoryId = body.categoryId
        let tmp = await seed.seedById(seedId)
        if(tmp == null){
            return "errooooooooooooooooooooooooooooooooooor"
        }
        tmp = await category.categoryById(categoryId)
        if(tmp == null){
            return "errooooooooooooooooooooooooooooooooooor"
        }
        tmp = await category.selectedCategoriesAndSeedId(categoryId,seedId)

        if(tmp[0] != undefined){
            return "exxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxists"
        }
        let result = await category.addCategoryToSeed(seedId,categoryId)
        return result
    }
    async delConnectionSeedAndCategory(body){
        let seedId = body.seedId
        let categoryId = body.categoryId
        let tmp = await seed.seedById(seedId)
        if(tmp == null){
            return "errooooooooooooooooooooooooooooooooooor"
        }
        tmp = await category.categoryById(categoryId)
        if(tmp == null){
            return "errooooooooooooooooooooooooooooooooooor"
        }
        tmp = await category.selectedCategoriesAndSeedId(categoryId,seedId)

        if(tmp[0] == undefined){
            return "does not exxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxists"
        }
        let result = await category.delConnectionSeedAndCategory(categoryId, seedId)
        return result
    }
}










module.exports = new Category();


                