const express = require("express");
const seed = require("../controller/seed");
const category = require("../controller/category");
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const picture = require("../controller/picture")






router.get("/", jsonParser, seed.sortSeeds);
router.post("/", jsonParser, seed.sortSeeds);
router.post("/seedcategories", jsonParser, category.seedCategories)
router.post("/seedpictures", jsonParser, picture.seedPicturies)
router.post("/seedfirstpicture", jsonParser, picture.seedFirstPicture)

module.exports = router;