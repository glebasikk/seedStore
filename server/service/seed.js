const seed = require("../repository/seed");
const category = require("../repository/category")



class Seed {
    async sortSeeds(query,body) {
        let offset = query.page 
        let substr = body.name
        let categories = body.categories
        let page = pageMech(offset)
        let tmpMas = []
        if (substr == null){
            if (categories == null){
                let result = await seed.allSeeds(page);
                return result
            }

            let priorityMas = []
            let priority1 = []    
            let priority2 = []
            let priority3 = []
            for (let i = 0; i<categories.length; i++){
                let priority = await category.priority(categories[i],1)
                if (priority.length != 0){
                    priority1.push(priority[0].dataValues.id)
                }
                priority = await category.priority(categories[i],2)
                if (priority.length != 0){
                    priority2.push(priority[0].dataValues.id)
                }
                priority = await category.priority(categories[i],3)
                if (priority.length != 0){
                    priority3.push(priority[0].dataValues.id)
                }
            }
            

            if(priority1.length != 0){
                priorityMas.push(priority1)
            }
            if(priority2.length != 0){
                priorityMas.push(priority2)
            }
            if(priority3.length != 0){
                priorityMas.push(priority3)
            }
            

            let len = priorityMas.length-1
            console.log(len)
            // }
            let tmpResult = await category.selectedCategories(priorityMas[0])
            
            for (let i = 0; i<tmpResult.length; i++){
                tmpMas.push(tmpResult[i].dataValues.seedId)
            }
            console.log(priorityMas)
            

            if(len>=1){
                tmpResult = await category.selectedCategoriesAndSeedId(priorityMas[1],tmpMas)
                tmpMas = []
            }
            for (let i = 0; i<tmpResult.length; i++){
                tmpMas.push(tmpResult[i].dataValues.seedId)
                
            }
            if(len==2){
                tmpResult = await category.selectedCategoriesAndSeedId(priorityMas[2],tmpMas)
                tmpMas = []
            }
            for (let i = 0; i<tmpResult.length; i++){
                tmpMas.push(tmpResult[i].dataValues.seedId)
                
            }

            
            let result = await seed.allSeedsByCategory(page,tmpMas)
            return result


        }
        if (categories == null){
            let result = await seed.allSeedsByName(page,substr);
            return result
        }
        let priorityMas = []
        let priority1 = []    
        let priority2 = []
        let priority3 = []
        for (let i = 0; i<categories.length; i++){
            let priority = await category.priority(categories[i],1)
            if (priority.length != 0){
                priority1.push(priority[0].dataValues.id)
            }
            priority = await category.priority(categories[i],2)
            if (priority.length != 0){
                priority2.push(priority[0].dataValues.id)
            }
            priority = await category.priority(categories[i],3)
            if (priority.length != 0){
                priority3.push(priority[0].dataValues.id)
            }
        }
        

        if(priority1.length != 0){
            priorityMas.push(priority1)
        }
        if(priority2.length != 0){
            priorityMas.push(priority2)
        }
        if(priority3.length != 0){
            priorityMas.push(priority3)
        }
        
        let len = priorityMas.length-1
        console.log(len)
        let tmpResult = await category.selectedCategories(priorityMas[0])
        
        for (let i = 0; i<tmpResult.length; i++){
            tmpMas.push(tmpResult[i].dataValues.seedId)
        }
        console.log(priorityMas)
        

        if(len>=1){
            tmpResult = await category.selectedCategoriesAndSeedId(priorityMas[1],tmpMas)
            tmpMas = []
        }
        for (let i = 0; i<tmpResult.length; i++){
            tmpMas.push(tmpResult[i].dataValues.seedId)
            
        }
        if(len==2){
            tmpResult = await category.selectedCategoriesAndSeedId(priorityMas[2],tmpMas)
            tmpMas = []
        }
        for (let i = 0; i<tmpResult.length; i++){
            tmpMas.push(tmpResult[i].dataValues.seedId)
            
        }      
        let result = await seed.allSeedsByNameAndCategory(page,substr,tmpMas)
        return result
        
    }
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



function pageMech (offset){
    
    if (offset == undefined || offset < 1) {
        offset = 1;
    }
    let end = 3
    return (offset-1)*end
}

module.exports = new Seed();