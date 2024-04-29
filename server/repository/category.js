const seedCategory = require("../models/seedCategory");
const category = require("../models/category");
const { Op } = require('sequelize')


class Category {
    async selectedCategories(categoryId) {

        return await seedCategory.findAll({
            attributes: ['seedId'],
            
            where: {
                categoryId: categoryId,
                

            },
            group: 'seedId',
        });
    }
    

    async selectedCategoriesAndSeedId(categoryId,seedId) {
        return await seedCategory.findAll({
            attributes: ['seedId'],
            
            where: {
                categoryId: categoryId,
                seedId: seedId 
            },
            group: 'seedId',
        });
    }

    async delSeed (seedId){
        return await seedCategory.destroy({
            where: {
                seedId: seedId
            }
        })
    }


    async delConnectionSeedAndCategory (categoryId,seedId){
        return await seedCategory.destroy({
            where: {
                categoryId: categoryId,
                seedId: seedId
            }
        })
    }
    
    async delConnectionSeedAndCategoryBySeedId (seedId){
        return await seedCategory.destroy({
            where: {
                seedId: seedId
            }
        })
    }

    async addCategoryToSeed (seedId, categoryId){
        return await seedCategory.create({
            seedId:seedId,
            categoryId: categoryId
        })
    } 

    async categoryById(id) {
        return await category.findOne({
            where: {
                id: id
            }
        });
    }


    async priority(id,priority){

        return await category.findAll({
            where:{
                priority: priority,
                id: id
            }
        })


    }



    async seedCategoriesId(seedId) {
        return await seedCategory.findAll({
            attributes: ['categoryId'],
            where: {
                seedId: seedId,
            },
        });
    }


    async listOfCategories() {
        return await category.findAll({});
    }

    async seedCategories(id) {
        return await category.findAll({
            where: {
                id: id,
            },
        });
    }

}

module.exports = new Category();