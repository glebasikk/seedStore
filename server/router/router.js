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


router.get("/", jsonParser, seed.sortSeeds);
router.post("/", seed.sortSeeds);
router.post("/addseed",jsonParser, authMidleware(["admin"]),seed.addSeed);
router.post("/updateseed", jsonParser,authMidleware(["admin"]), seed.updateSeed);
router.post("/delseed", jsonParser, authMidleware(["admin"]),seed.delSeed);
router.post("/seedcategories", jsonParser, category.seedCategories);
router.post("/addcategorytoSeed", jsonParser, category.addCategoryToSeed);
router.post("/delconnectionseedandcategory", jsonParser, category.delConnectionSeedAndCategory);
router.post("/seedpictures", jsonParser, picture.seedPicturies);
router.post("/seedfirstpicture", jsonParser, picture.seedFirstPicture);
router.post("/downloadpicture", jsonParser, picture.downloadPicture);
router.post("/addpicture", jsonParser,   upload.single("file") ,picture.addPicture);
router.post("/delpicture", jsonParser, picture.delPicture);
router.post("/updatepicture", jsonParser,upload.single("file"), picture.updatePicture);
router.post("/additionalInfo", jsonParser, additionalInfoOfCurrentSeed.additionalInfoOfCurrentSeed);
router.post("/addadditionaiInfo", jsonParser, additionalInfoOfCurrentSeed.addAdditionalInfo);
router.post("/deladditionaiInfo", jsonParser, additionalInfoOfCurrentSeed.delAdditionalInfo);
router.post("/registration",jsonParser, auth.registration);
router.post("/auth",jsonParser, auth.login);
router.get( "/addsession", auth.session)
router.post("/addcart",jsonParser,authMidleware(["admin"]),cart.addCart)
router.get("/usercart",jsonParser,authMidleware(["admin"]),cart.userCart)
router.post("/updatecart",jsonParser,authMidleware(["admin"]),cart.updateCart)
router.post("/deletecart",jsonParser,authMidleware(["admin"]),cart.deleteCart)


module.exports = router;