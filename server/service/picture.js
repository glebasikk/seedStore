const seed = require("../repository/seed");
const category = require("../repository/category")
const picture = require("../repository/picture")
const config = require("../config")
let fs = require('fs');


class Picture {

    async seedPictures(body){
        let seedId = body.seedId
        let result = await picture.seedPictures(seedId)
        return result
    }
    async seedFirstPicture(body){
        let seedId = body.seedId
        let result = await picture.seedOnePicture(seedId)
        return `${config.path}uploads/${result.dataValues.picture}`
    }
    async addPicture(body,file){
        let seedId = body.seedId
        let filename = file.filename
        console.log(filename,seedId)
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
}










module.exports = new Picture();


                