const seed = require("../repository/seed");
const picture = require("../repository/picture")
const config = require("../config")
const NotFound = require("../errors/NotFound")
let fs = require('fs');


class Picture {

    async seedPictures(body){
        let seedId = body.seedId
        let result = await picture.seedPictures(seedId)
        let tmpMas = []
        if (result == null){
            throw new NotFound("This seed has no pictures");
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
            return null
        }
        return result
    }
    async downloadPicture(body){
        
        let img = body.file
        let result = await picture.pictureByName(img)
        if(result !=1){
            throw new NotFound("Picture doesn't exist");
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
             });
             throw new NotFound("File doesn't exist");
        }
        let result = await picture.addPicture(seedId,filename)
        return result
    }
    async delPicture(body){
        let id = body.id
        let checkPicture = await picture.pictureExist(id)
        if (checkPicture == 0){
            throw new NotFound("Picture doesn't exist");
        }
        let result = await picture.delPicture(id)
        return result
    }
    async updatePicture(body,file){
        let id = body.id
        let filename = file.filename
        let checkPicture = await picture.pictureExist(id)
        if (checkPicture == 0){
            throw new NotFound("Picture doesn't exist");
        }
        let result = await picture.updatePicture(id,filename)
        return result
    }
}










module.exports = new Picture();


                