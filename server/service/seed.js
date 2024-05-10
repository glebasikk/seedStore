const seed = require("../repository/seed");
const category = require("../repository/category")
const InrenalServerError = require("../errors/InrenalServerError")
const categoryServ = require("./category")
const pictureServ = require("./picture")
const addadditionaiInfoServ = require("./additionalInformation")
class Seed {
    async sortSeeds(query,body) {
        let offset = query.page 
        let substr = body.name
        let categories = body.category
        let page = pageMech(offset)
        let tmpMas = []
        if (substr == null){
            if (categories == null || categories.length == 0){
                let result = await seed.allSeeds(page);
                for(let i = 0; i<result.rows.length;i++){

                    let body = {seedId: result.rows[i].dataValues.id}

                    let pictureResult = await pictureServ.seedFirstPicture(body)
                    
                    if (pictureResult == null){

                        result.rows[i].dataValues.picture = null
                    }else{

                        result.rows[i].dataValues.picture = pictureResult.dataValues.picture
                    }
                    

                }

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
            let tmpResult = await category.selectedCategories(priorityMas[0])
            
            for (let i = 0; i<tmpResult.length; i++){
                tmpMas.push(tmpResult[i].dataValues.seedId)
            }


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
            for(let i = 0; i<result.rows.length;i++){

                let body = {seedId: result.rows[i].dataValues.id}

                let pictureResult = await pictureServ.seedFirstPicture(body)
                
                if (pictureResult == null){

                    result.rows[i].dataValues.picture = null
                }else{
                    console.log(pictureResult)
                    result.rows[i].dataValues.picture = pictureResult.dataValues.picture
                }
                

            }
            return result


        }
        if (categories == null || categories.length == 0){
            let result = await seed.allSeedsByName(page,substr);
            for(let i = 0; i<result.rows.length;i++){

                let body = {seedId: result.rows[i].dataValues.id}

                let pictureResult = await pictureServ.seedFirstPicture(body)
                
                if (pictureResult == null){

                    result.rows[i].dataValues.picture = null
                }else{
                 
                    result.rows[i].dataValues.picture = pictureResult.dataValues.picture
                }
            }
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

        let tmpResult = await category.selectedCategories(priorityMas[0])
        
        for (let i = 0; i<tmpResult.length; i++){
            tmpMas.push(tmpResult[i].dataValues.seedId)
        }
        

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
        for(let i = 0; i<result.rows.length;i++){

            let body = {seedId: result.rows[i].dataValues.id}

            let pictureResult = await pictureServ.seedFirstPicture(body)
            
            if (pictureResult == null){

                result.rows[i].dataValues.picture = null
            }else{

                result.rows[i].dataValues.picture = pictureResult.dataValues.picture
            }
            

        }
        return result
        
    }
    async addSeed(body){
        let name = body.name
        let info = body.info
        let price = body.price
        let result = await seed.addSeed(name,info,price)
        if (result == null) {
            throw new InrenalServerError("No value is created");
        }
        return true
    }
    

    async updateSeedAllInfo(body){
        let seedId = body.seedId
        let name = body.name
        let info = body.info
        let price = body.price
        let categoryId = body.categoryId
        let title = body.title
        let content = body.content
        let updateSeed = await seed.updateSeed(seedId, name,info,price)
        if (updateSeed == null) {
            throw new InrenalServerError("No value is updated");
        }
        let  result = await seed.seedById(seedId)
        if (result == null) {
            throw new InrenalServerError("Seed does not exist");
        }



        if(categoryId == null){
            categoryId = [0]
        }

        await categoryServ.delConnectionSeedAndCategoryBySeedId(body)
        let tmp = await categoryServ.addCategoryToSeedExtended(body)
        result.dataValues.categories = tmp

        if(title == null || content == null){
            title = [0]
            content = [0]
        }

        await addadditionaiInfoServ.delAdditionalInfoBySeedId(body)
        tmp = await addadditionaiInfoServ.addAdditionalInfoExtended(body)

        result.dataValues.additionaiInfo = tmp

        return result
    }

    async addSeedAllInfo(body){
        let name = body.name
        let info = body.info
        let price = body.price
        let categoryId = body.categoryId
        let title = body.title
        let content = body.content
        let result = await seed.addSeed(name,info,price)
        if (result == null) {
            throw new InrenalServerError("No value is created");
        }

        body.seedId = result.dataValues.id
        if(categoryId == null){
            categoryId = [0]
        }
        let tmp = await categoryServ.addCategoryToSeedExtended(body)
        result.dataValues.categories = tmp
        if(title == null || content == null){
            title = [0]
            content = [0]
        }

        tmp = await addadditionaiInfoServ.addAdditionalInfoExtended(body)
        result.dataValues.additionaiInfo = tmp

        return result
    }

    async updateSeed(body){
        let id = body.id
        let name = body.name
        let info = body.info
        let price = body.price
        let result = await seed.updateSeed(id,name,info,price)
        return result[0]
    }
    async delSeed(body){
        let id = body.id
        let result = await seed.delSeed(id)
        return result
    }
    async seedAllInfo (body){
        let seedId = body.seedId 
        let tmp = []
        let result = await seed.seedByIdExtended(seedId)
        if (result == null) {
            throw new InrenalServerError("Seed not exist");
        }
        let categoryResult = await categoryServ.seedCategories(body)

        for(let i = 0; i<categoryResult.length; i++){
            tmp.push(categoryResult[i].dataValues)
           
        }
        result.dataValues.categories = tmp
        if (tmp.length === 0) {
            result.dataValues.categories = null
        }
        tmp = []
        let pictureResult = await pictureServ.seedPictures(body)
        for(let i = 0; i<pictureResult.length; i++){
            tmp.push(pictureResult[i].dataValues)
        }
        result.dataValues.pictures = tmp
        if (tmp.length === 0) {
            result.dataValues.pictures = null
        }

        let  addadditionaiInfoResult = await addadditionaiInfoServ.additionalInfoOfCurrentSeed(body)
        tmp = []

        for(let i = 0; i<addadditionaiInfoResult.length; i++){
            tmp.push(addadditionaiInfoResult[i].dataValues)
        }
        result.dataValues.additionaiInfo = tmp
        if (tmp.length === 0) {
            result.dataValues.additionaiInfo = null
        }

        return result
    }
}
    


function pageMech (offset){
    
    if (offset == undefined || offset < 1) {
        offset = 1;
    }
    let end = 10
    console.log((offset-1)*end)
    return (offset-1)*end
}

module.exports = new Seed();