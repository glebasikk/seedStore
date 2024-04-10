const seed = require("../repository/seed");
const category = require("../repository/category")
const picture = require("../repository/picture")
const NotFound = require("../errors/NotFound")
const InrenalServerError = require("../errors/InrenalServerError")

class Category {
    async seedCategories(body){
        let seedId = body.seedId
        let tmpMas = []
        if(seedId == undefined){

        }
        let result = await category.seedCategoriesId(seedId)
        for (let i = 0; i<result.length; i++){
            tmpMas.push(result[i].dataValues.categoryId)
        }
      
        result = await category.seedCategories(tmpMas)
        console.log(result)
        return result
    }

    async listOfCategories(){
        let result = await category.listOfCategories()
        if(result == null){
            throw new NotFound("Category doesn't exist");
        }
        return result
    }

    async addCategoryToSeed(body){
        let seedId = body.seedId
        let categoryId = body.categoryId
        let tmp = await seed.seedById(seedId)
        if(tmp == null){
                throw new NotFound("Seed doesn't exist");
        }
        tmp = await category.categoryById(categoryId)
        if(tmp == null){
            throw new NotFound("Category doesn't exist");
        }
        tmp = await category.selectedCategoriesAndSeedId(categoryId,seedId)

        if(tmp[0] != undefined){
            throw new InrenalServerError("Coombinatin of seed and category exist");
        }
        let result = await category.addCategoryToSeed(seedId,categoryId)
        return result
    }
    async delConnectionSeedAndCategory(body){
        let seedId = body.seedId
        let categoryId = body.categoryId
        let tmp = await seed.seedById(seedId)
        if(tmp == null){
            throw new NotFound("Seed doesn't exist");
        }
        tmp = await category.categoryById(categoryId)
        if(tmp == null){
            throw new NotFound("Category doesn't exist");
        }
        tmp = await category.selectedCategoriesAndSeedId(categoryId,seedId)

        if(tmp[0] == undefined){
            throw new InrenalServerError("Coombinatin of seed and category does not exist");
        }
        let result = await category.delConnectionSeedAndCategory(categoryId, seedId)
        return result
    }
}










module.exports = new Category();


                