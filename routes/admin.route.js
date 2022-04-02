const express = require("express");
const adminController = require("../controller/admin.controller");
const categoryController = require("../controller/category.controller");
const userController = require("../controller/user.controller");
const foodPackages = require("../controller/foodPackage.controller");
const orderController = require("../controller/order.controller");
const { body } = require("express-validator");
const tokenVerification = require('../mid/token_verification')
const multer = require("multer");
var Storage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: Storage });        

const router = express.Router();

router.post("/signup", adminController.signup);

router.post("/login", adminController.signin);

router.post(
  "/addcategory",tokenVerification.verifyToken,
  upload.single("categoryimage"),
  body("categoryname"),
  categoryController.addCategory
);
router.get("/viewcategory", categoryController.viewcategory);
router.delete("/deletecategory/:id", categoryController.deletecategory);
router.post(
  "/updatecategory/:id",
  upload.single("categoryimage"),
  body("categoryname").not().isEmpty(),
  body("categoryId").not().isEmpty(),
  categoryController.updatecategory
);

router.post(
  "/addfoodpackage",
  upload.single("foodimage"),
  foodPackages.addfoodpackage
);
router.get("/viewfoodpackage", foodPackages.viewallfoodlist);
router.get("/viewfoodbycategory/:id", foodPackages.viewcategorylist);
router.delete("/deletefoodpackage/:id", foodPackages.deletefoodpackage);
router.post(
  "/updatefoodpackage/:id",
  upload.single("foodimage"),
  foodPackages.updatefoodpackage
);

router.get("/viewusers", userController.viewusers);

router.post("/updateprofile/:id", adminController.updateprofile);

router.get("/orderhistry", orderController.allorderhistory);

router.post("/addtoblock/:id", userController.addtoblock);

router.post("/removefromblock/:id", userController.removefromblock);

module.exports = router;
