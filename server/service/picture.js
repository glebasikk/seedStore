const seed = require("../repository/seed");
const category = require("../repository/category")
const picture = require("../repository/picture")



class Picture {

    async seedPictures(body){
        let seedId = body.seedId
        let tmpMas = []
        let result = await picture.seedPicturiesId(seedId)
        for (let i = 0; i<result.length; i++){
            tmpMas.push(result[i].dataValues.pictureId)
        }
        console.log(tmpMas)
        result = await picture.seedPictures(tmpMas)
        return result
    }
    async seedFirstPicture(body){
        let seedId = body.seedId
        let result = await picture.seedPictureId(seedId)
        console.log(result)
        result = result.dataValues.pictureId
        
        result = await picture.seedPicture(result)
        return result
    }
}










module.exports = new Picture();


                