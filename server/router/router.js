const express = require("express");
const seed = require("../controller/seed");
const category = require("../controller/category");
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const picture = require("../controller/picture")
const upload = require("../midleware/upload")
const additionalInfoOfCurrentSeed = require("../controller/additionalInformation")




router.get("/", jsonParser, seed.sortSeeds);
router.post("/", jsonParser, seed.sortSeeds);
router.post("/seedcategories", jsonParser, category.seedCategories)
router.post("/seedpictures", jsonParser, picture.seedPicturies)
router.post("/seedfirstpicture", jsonParser, picture.seedFirstPicture)
router.post("/addpicture", jsonParser,   upload.single("file") ,picture.addPicture)
router.post("/additionalInfo", jsonParser, additionalInfoOfCurrentSeed.additionalInfoOfCurrentSeed)
router.post("/addAdditionalInfo", jsonParser, additionalInfoOfCurrentSeed.addAdditionalInfo)
router.post("/delAdditionalInfo", jsonParser, additionalInfoOfCurrentSeed.delAdditionalInfo)
module.exports = router;