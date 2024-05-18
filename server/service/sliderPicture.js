const sliderPicture = require("../repository/sliderPicture")
const config = require("../config")
const NotFound = require("../errors/NotFound")
let fs = require('fs');
//Picture
//sliderPicture
class SliderPicture {
    async addPicture(body,file){
        let filename = file.filename
        //await this.delFile(body)
        let result = await sliderPicture.addPicture(filename)
        return result
    }
    async allPicturies(){
        let result = await sliderPicture.allPicturies()
        return result
    }
    async delPicture(body){
        let id = body.id
        let result = await sliderPicture.pictureById(id)
        result = await sliderPicture.delPicture(id)
        return result
    }
        async downloadPicturies(body){
        let id = body.id
        let result = await sliderPicture.pictureById(id)
        if(result.length == 0){
            throw new NotFound("Picture doesn't exist");
        }
        return `${config.path}uploads/${result[0].dataValues.picture}`
    }
    
}

module.exports = new SliderPicture();


                