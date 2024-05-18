const sliderPicture = require("../models/sliderPicture");
const { Op } = require('sequelize')


class SliderPicture {
    async addPicture(filename){
        
        return await sliderPicture.create({
            picture:filename
        })
    }
    async allPicturies(){
        return await sliderPicture.findAll({})
    }
    async delPicture(id){
        return await sliderPicture.destroy({
            where:{
                id:id
            }
        })
    }
    async pictureById(id) {
        return await sliderPicture.findAll({
            where: {
                id: id,
            },
        });
    }
}





module.exports = new SliderPicture();