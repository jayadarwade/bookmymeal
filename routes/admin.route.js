const express = require('express');
const { response, request } = require('express');
const adminController = require('../controller/admin.controller');
const categoryController = require("../controller/category.controller");
const userController=require('../controller/user.controller');
const foodPackages = require("../controller/foodPackage.controller");
const orderController = require("../controller/order.controller")
const {body }= require('express-validator')
const multer = require("multer");
var Storage = multer.diskStorage({
    destination: "public/images",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
})
var upload = multer({ storage: Storage });

const router = express.Router();

router.post("/signup"
    , adminController.signup);

router.get("/login"
    , adminController.signin);


router.post("/addcategory",
    upload.single("categoryimage"),
    body("categoryname"),
    categoryController.addCategory);
// router.get("/viewcategory", control.viewcategory);
router.delete("/deletecategory/:id", categoryController.deletecategory);
router.post("/updatecategory", upload.single('categoryimage'),
    body('categoryname').not().isEmpty(),
    body("categoryId").not().isEmpty(),
    categoryController.updatecategory);

router.post("/addfoodpackage", upload.single("foodimage"), foodPackages.addfoodpackage);

// router.get("/viewfoodpackage", foodPackages.viewfoodpackage);
// router.post('/viewfoodpackage/:categoryId', foodPackages.viewfoodpackagebycategory);

router.delete("/deletefoodpackage/:id", foodPackages.deletefoodpackage);

router.post("/updatefoodpackage", upload.single('foodimage'),
     body('productname'),
     body("productprice"),
     body("productqty"),
     body("productDescription"),
     body('productId'),
    foodPackages.updatefoodpackage);

router.get("/viewusers",userController.viewusers);

router.post("/updateprofile",adminController.updateprofile);

router.get("/orderhistry",orderController.allorderhistory);

module.exports = router;