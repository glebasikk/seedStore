const joi = require('joi');


const updateCartValidator = joi.object({
        id: joi.number().required(),
        userId: joi.number(),
        seedId: joi.number().integer().min(1),
        amount: joi.number().integer().min(1)

});

const mailValidator = joi.object({
        paymentMethod: joi.string().required(),
        deliveryMethod: joi.string().required(),
        phone: joi.string().required(),
        username: joi.string().required(),
        amount: joi.array().required(),
        seedId: joi.array().required(),
});


const updateSeedAllInfo = joi.object({
        seedId: joi.number().required(),
        userId: joi.number(),
        name: joi.string().required(),
        price: joi.number().required(),
        info: joi.string(), 
        categoryId: joi.array().required(),
        title:   joi.array().required(),
        content: joi.array().required(), 
});


const addSeedAllInfo = joi.object({
        userId: joi.number(),
        name: joi.string().required(),
        price: joi.number().required(),
        info: joi.string(), 
        categoryId: joi.array().required(),
        title:   joi.array().required(),
        content: joi.array().required(), 
});

const addCartValidator = joi.object({
        userId: joi.number(),
        seedId: joi.number().integer().min(1).required()  ,
        amount:   joi.number().min(1).required()
});


const deladditionaiInfoValidator = joi.object({
        userId: joi.number(),
        seedId: joi.number().integer().min(1).required()  ,
        title:   joi.string() 
});

const addAdditionalInfoValidator = joi.object({
        userId:  joi.number(),
        seedId:  joi.number().integer().min(1).required(),
        title:   joi.string().required(),
        content: joi.string().required(),
});

const emptyValidator = joi.object({
        userId: joi.number().integer().min(1)    
});

const numberValidator = joi.object({
        page: joi.number().integer().min(1)    
});

const updateImgNameValidator = joi.object({
        userId: joi.number(),
        id: joi.number().integer().min(1).required()   
});

const imgNameValidator = joi.object({
        userId: joi.number(),
        file: joi.string().required()   
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

const changePasswordValidation = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
        newPassword: joi.string().required()
});


  
module.exports = {
        changePasswordValidation,
        mailValidator,
        updateSeedAllInfo,
        addSeedAllInfo,
        updateCartValidator,
        emptyValidator,
        addCartValidator,
        deladditionaiInfoValidator,
        addAdditionalInfoValidator,
        updateImgNameValidator,
        imgNameValidator,
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