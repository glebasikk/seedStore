const seed = require("../service/seed");
const {sortSeedsValidation,numberValidator} = require("../midleware/validator");





class Seed {
    async sortSeeds(req, res, next) {
        try {
            let {value, error} = sortSeedsValidation.validate(req.body)
            if (error){
                return res.status(422).json(error)
            } 
            let query = await numberValidator.validateAsync(req.query)
            let result = await seed.sortSeeds(query,value);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new Seed();
