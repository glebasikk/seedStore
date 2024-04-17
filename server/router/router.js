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


router.get("/seeds", jsonParser, seed.sortSeeds);
router.post("/", seed.sortSeeds);
router.post("/addseed",jsonParser, authMidleware(["admin"]),seed.addSeed);
router.post("/updateseed", jsonParser,authMidleware(["admin"]), seed.updateSeed);
router.post("/delseed", jsonParser, authMidleware(["admin"]),seed.delSeed);
router.get("/listofcategories", jsonParser, category.listOfCategories);
router.post("/seedcategories", jsonParser, category.seedCategories);
router.post("/addcategorytoSeed", jsonParser,authMidleware(["admin"]), category.addCategoryToSeed);
router.post("/delconnectionseedandcategory",authMidleware(["admin"]), jsonParser, category.delConnectionSeedAndCategory);
router.post("/seedpictures", jsonParser, picture.seedPicturies);
router.post("/seedfirstpicture", jsonParser, picture.seedFirstPicture);
router.post("/downloadpicture", jsonParser, picture.downloadPicture);
router.post("/addpicture", jsonParser, authMidleware(["admin"]),  upload.single("file") ,picture.addPicture);
router.post("/delpicture", jsonParser, jsonParser,authMidleware(["admin"]), picture.delPicture);
router.post("/updatepicture", jsonParser, jsonParser,authMidleware(["admin"]), upload.single("file"), picture.updatePicture);
router.post("/additionalinfo", jsonParser, additionalInfoOfCurrentSeed.additionalInfoOfCurrentSeed);
router.post("/addadditionaiInfo", jsonParser, authMidleware(["admin"]), additionalInfoOfCurrentSeed.addAdditionalInfo);
router.post("/deladditionaiInfo", jsonParser, authMidleware(["admin"]), additionalInfoOfCurrentSeed.delAdditionalInfo);
router.post("/registration",jsonParser, auth.registration);
router.post("/auth",jsonParser, auth.login);
router.get( "/addsession", auth.session)
router.post("/addcart",jsonParser,authMidleware(["admin","user"]),cart.addCart)
router.get("/usercart",jsonParser,authMidleware(["admin","user"]),cart.userCart)
router.post("/updatecart",jsonParser,authMidleware(["admin","user"]),cart.updateCart)
router.post("/deletecart",jsonParser,authMidleware(["admin","user"]),cart.deleteCart)



//////////////////
router.post("/seedallInfo", jsonParser, seed.seedAllInfo);

module.exports = router;