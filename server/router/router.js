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
router.post("/addseed", jsonParser, seed.addSeed);
router.post("/updateseed", jsonParser, seed.updateSeed);
router.post("/delseed", jsonParser, seed.delSeed);
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
router.post("/addAdditionalInfo", jsonParser, additionalInfoOfCurrentSeed.addAdditionalInfo);
router.post("/delAdditionalInfo", jsonParser, additionalInfoOfCurrentSeed.delAdditionalInfo);

module.exports = router;