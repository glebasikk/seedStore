const express = require("express");
const seed = require("../controller/seed");
const category = require("../controller/category");
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const picture = require("../controller/picture")
const upload = require("../midleware/upload")
const additionalInfoOfCurrentSeed = require("../controller/additionalInformation")
const auth = require("../controller/auth")
const authMidleware = require("../midleware/auth");
const cart = require("../controller/cart")


////////////////// Запрос на получение всей инфы из карточки товара. "seedId" обязательно
router.post("/seedallInfo", jsonParser, seed.seedAllInfo);


// Там где в запросе есть такая строка "authMidleware(["admin"])" удаляй ее ибо это проверка авторизациии
router.get("/allSeed", jsonParser, seed.sortSeeds);// Простой гет запрос на все семена (чтобы выбрать страницу в пути запроса добавляй ?page="номер страницы"); Буду приводить запрос к желаемому тобой содержимому данных
router.post("/allSeedSort", seed.sortSeeds); // запрос тот же что и выше только здесь можно отсортировать по полям "name", ""category": [1,2,3,4,5,6,7,8,9] оба поля необязательны"
router.post("/addseed",jsonParser, authMidleware(["admin"]),seed.addSeed); //Добавить в базу наименование семян. "name" "price" "info" поле инфо необязательное
router.post("/updateseed", jsonParser,authMidleware(["admin"]), seed.updateSeed);//Изменить в базе семяна."id" "name" "price" "info" поле id обязательное
router.post("/delseed", jsonParser, authMidleware(["admin"]),seed.delSeed);//Удалить в базе семяна."id" поле id обязательное
router.get("/listofcategories", jsonParser, category.listOfCategories); //список категорий
router.post("/seedcategories", jsonParser, category.seedCategories);//список категорий привязанных к семени. "id" поле id обязательное
router.post("/addcategorytoSeed", jsonParser,authMidleware(["admin"]), category.addCategoryToSeed);//Добавить категорию к семени к семени. "seedid", "categoryId" поля обязательны
router.post("/delconnectionseedandcategory",authMidleware(["admin"]), jsonParser, category.delConnectionSeedAndCategory);   //Удалить связь категории и семени. "seedid", "categoryId" поля обязательны
router.post("/seedpictures", jsonParser, picture.seedPicturies);    //список фоток пренадлежащих растению. "seedId" обязательно 
router.post("/seedfirstpicture", jsonParser, picture.seedFirstPicture); //Скачать фото первое фото с сервака по "seedId"
router.post("/downloadpicture", jsonParser, picture.downloadPicture);   // скачать фото по имени фото с сервака ""file": "1713157042497-1303507287_Tomato.png"" Вечно забываю уточнить один вопрос у тебя по этому запросу
router.post("/addpicture", jsonParser, authMidleware(["admin"]),  upload.single("file") ,picture.addPicture); // добавить фото "form-data ->  "seedId","file"
router.post("/delpicture", jsonParser, jsonParser,authMidleware(["admin"]), picture.delPicture);//удалить фото. Указать айди именно фото "id"
router.post("/updatepicture", jsonParser, jsonParser,authMidleware(["admin"]), upload.single("file"), picture.updatePicture);// добавить фото "form-data ->  "id","file" (где id это id фото)
router.post("/additionalinfo", jsonParser, additionalInfoOfCurrentSeed.additionalInfoOfCurrentSeed); //кастомная инфа для конретного растения. "seedId" 
router.post("/addadditionaiInfo", jsonParser, authMidleware(["admin"]), additionalInfoOfCurrentSeed.addAdditionalInfo);//добавить кастомную инфу к семмянам. "id","title","content" нужно все
router.post("/deladditionaiInfo", jsonParser, authMidleware(["admin"]), additionalInfoOfCurrentSeed.delAdditionalInfo);//удалить кастомную инфу. "seedId" если надо удалить конкретный заголовок добавить "title"
router.post("/registration",jsonParser, auth.registration); //Хз надо ли но без этого не добавить ни одного пользователя (вообще никак, даже добавляя в sql) по умолчанию role:admin. "username", "password" //Закащик просил добавить смену пароля для админа что я собственно забыл и сделать и сказакть 
router.post("/auth",jsonParser, auth.login); //"Авторизация". "username", "password" ответ будет ключ авторизации для cookies. чтобы не мучаться можежб ввести этот: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsInR5cGUiOiJBY2Nlc3MiLCJpYXQiOjE3MTMxNjkxNDEsImV4cCI6MTc5OTU2OTE0MX0.92zlmsmwYdd1XzPQlU_YXhPmWs5tFOwYG_bSjevgz94
router.get( "/addsession", auth.session) //Это для сохранения сессии. Я тут подумал если можно легко это сделать на твоей стороне то лучше так и посткпить. пока сама не решишь как делать в запросы ниже нелезь
router.post("/addcart",jsonParser,authMidleware(["admin","user"]),cart.addCart)
router.get("/usercart",jsonParser,authMidleware(["admin","user"]),cart.userCart)
router.post("/updatecart",jsonParser,authMidleware(["admin","user"]),cart.updateCart)
router.post("/deletecart",jsonParser,authMidleware(["admin","user"]),cart.deleteCart)





module.exports = router;