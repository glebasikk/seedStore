const seed = require("../repository/seed");
const catalog = require("../repository/catalog")
const config = require("../config")
const NotFound = require("../errors/NotFound")
let fs = require('fs');


class Catalog {
    async addFile(body,file){
        let id = body.id
        let filename = file.filename
        await this.delFile(body)
        let result = await catalog.addFile(id,filename)
        return result
    }
    async allFiles(){
        let result = await catalog.allFiles()
        return result
    }
    async delFile(body){
        let id = body.id
        let result = await catalog.fileById(id)
        result = await catalog.delFile(id)
        return result
    }
        async downloadFile(body){
        
        let id = body.id
        let result = await catalog.fileById(id)
        if(result.length == 0){
            throw new NotFound("File doesn't exist");
        }
        return `${config.path}uploads/${result[0].dataValues.catalog}`
    }
    
}

module.exports = new Catalog();


                