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
router.get("/deletecategory/:id", categoryController.deletecategory);
router.post(
  "/updatecategory/:id",tokenVerification.verifyToken,
  upload.single("categoryimage"),
  body("categoryname").not().isEmpty(),
  body("categoryId").not().isEmpty(),
  categoryController.updatecategory
);

router.post(
  "/addfoodpackage",tokenVerification.verifyToken,
  upload.single("foodimage"),
  foodPackages.addfoodpackage
);
router.get("/viewfoodpackage",tokenVerification.verifyToken, foodPackages.viewallfoodlist);
router.get("/viewfoodbycategory/:id",tokenVerification.verifyToken, foodPackages.viewcategorylist);
router.delete("/deletefoodpackage/:id",tokenVerification.verifyToken, foodPackages.deletefoodpackage);
router.post(
  "/updatefoodpackage/:id",tokenVerification.verifyToken,
  upload.single("foodimage"),
  foodPackages.updatefoodpackage
);

router.get("/viewusers",tokenVerification.verifyToken, userController.viewusers);

router.post("/updateprofile/:id",tokenVerification.verifyToken, adminController.updateprofile);

router.get("/orderhistry",tokenVerification.verifyToken, orderController.allorderhistory);

router.post("/addtoblock/:id",tokenVerification.verifyToken, userController.addtoblock);

router.post("/removefromblock/:id",tokenVerification.verifyToken, userController.removefromblock);

module.exports = router;
