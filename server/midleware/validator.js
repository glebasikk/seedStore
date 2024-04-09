const joi = require('joi');



const numberValidator = joi.object({
        page: joi.number().integer().min(1)    
});


const seedCategoriesValidator = joi.object({
        userId: joi.number(),
        seedId: joi.number().integer().min(1).required()   
});

const delSeedValidation = joi.object({
        userId: joi.number(),
        id: joi.number().integer().min(1).required()
});


const addCategoryToSeedValidator = joi.object({
        userId: joi.number(),
        seedId: joi.number().integer().min(1).required(),  
        categoryId: joi.number().integer().min(1).required() 
});


const addSeedValidation = joi.object({
        userId: joi.number(),
        name: joi.string().required(),
        price: joi.number().required(),
        info: joi.string()   
});

const updateSeedValidation = joi.object({
        userId: joi.number(),
        id: joi.number().integer().min(1).required(),
        name: joi.string(),
        price: joi.number(),
        info: joi.string()   
});

const sortSeedsValidation = joi.object({
        name: joi.string(),
        category: joi.array().items(joi.number()),   
});

const updateMeetingValidation = joi.object({
        id: joi.number().integer().min(1).required(),    
        topic: joi.string().required(),
        tag: joi.string().required(), 
        date: joi.date().required(), 
        place: joi.string().required(),     
});


const filteredMeetings = joi.object({
        id: joi.number().integer().min(1),    
        topic: joi.string(),
        tag: joi.string(), 
        date: joi.date(), 
        place: joi.string(),     
});
const addGuestValidator = joi.object({
        id: joi.number().required(),
        userId: joi.number().required(),
        meetingId: joi.number().required(),   
});

const registrationAndAuthValidation = joi.object({
        username: joi.string().required(),
        password: joi.string().required()    
});


  
module.exports = {
        addCategoryToSeedValidator,
        delSeedValidation,
        updateSeedValidation,
        addSeedValidation,
        numberValidator,
        sortSeedsValidation,
        seedCategoriesValidator,
        updateMeetingValidation,
        filteredMeetings,
        registrationAndAuthValidation,
        addGuestValidator,
}