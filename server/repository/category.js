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

    async seedCategories(id) {
        return await category.findAll({
            where: {
                id: id,
            },
        });
    }

}

module.exports = new Category();