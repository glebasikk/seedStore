const seed = require("../repository/seed");
const category = require("../repository/category")
const picture = require("../repository/picture")
const config = require("../config")
let fs = require('fs');


class Picture {

    async seedPictures(body){
        let seedId = body.seedId
        let result = await picture.seedPictures(seedId)
        let tmpMas = []
        if (result == null){
            return ("errrrrrrrrrrrrrrrrrrrrrrrrror")
        }
        for(let i = 0; i<result.length;i++){
            tmpMas.push(`${config.path}uploads/${result[i].dataValues.picture}`)
        }
        return result
    }
    async seedFirstPicture(body){
        
        let seedId = body.seedId
        let result = await picture.seedOnePicture(seedId)
        if (result == null){
            return ("errrrrrrrrrrrrrrrrrrrrrrrrror")
        }
        
        return `${config.path}uploads/${result.dataValues.picture}`
    }
    async downloadPicture(body){
        
        let img = body.img
        let result = await picture.pictureByName(img)
        if(result !=1){
            return ("eerrrrrrrrrrrrrrrrrrrrrrrrror")
        }
        return `${config.path}uploads/${img}`
    }
    async addPicture(body,file){
        let seedId = body.seedId
        let filename = file.filename
        let checkSeed = await seed.seedExist(seedId)
        if (checkSeed <= 0){
            fs.unlink(`./uploads/${filename}`, err => {
                if(err) throw err;
                console.log('Файл успешно удалён');
             });
            return ("seed does not exist")
        }
        let result = await picture.addPicture(seedId,filename)
        return result
    }
    async delPicture(body){
        let id = body.id

        let checkPicture = await picture.pictureExist(id)

        if (checkPicture == 0){
            return ("Picture does not exist")
        }
        let result = await picture.delPicture(id)
        return result
    }
    async updatePicture(body,file){
        let id = body.id
        let filename = file.filename
    
        let checkPicture = await picture.pictureExist(id)
        console.log(checkPicture,id,filename)
        if (checkPicture == 0){
         
            return ("Picture does not exist")
        }
        let result = await picture.updatePicture(id,filename)
        return result
    }
}










module.exports = new Picture();


                