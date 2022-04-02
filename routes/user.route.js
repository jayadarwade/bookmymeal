const express  = require('express');
const userController=require('../controller/user.controller');
const cartController=require("../controller/cart.controller");
const foodPackages=require("../controller/foodPackage.controller");
const favourateController=require("../controller/favourate.controller");
const orderController=require("../controller/order.controller");
const tokenVerification = require('../mid/token_verification');
const {body} =require('express-validator');

const router = express.Router();

router.post("/signup"
               ,body("username","please enter valid username").isAlpha()
               ,body("email","please enter valid email").isEmail()
               ,body("password","password must be 5 letter long").isLength(5)
               ,body("mobile","please enter valid mobile number").isLength(10)
               ,userController.signup);

router.post("/signin"
                // ,body("email","please enter valid email").isEmail()
                // ,body("password","password must be 5 letter long").isLength(5)
                ,userController.signin);
 

router.post("/addtocart",tokenVerification.verifyToken,cartController.addToCart);
router.get("/viewcart/:id",tokenVerification.verifyToken,cartController.viewcartone);
router.delete("/deleteproductfromcart/:id/:packageId",tokenVerification.verifyToken,cartController.deleteOneProduct);
router.delete("/deletecart/:id",tokenVerification.verifyToken,cartController.deletecart);

router.post("/addtofavourate",tokenVerification.verifyToken,favourateController.addtofavourate);
router.get("/viewfavourate/:id",tokenVerification.verifyToken,favourateController.viewfavourateone);
router.delete("/deletefavourate/:id",tokenVerification.verifyToken,favourateController.deletefavourate);
router.delete("/deleteOnefavourate/:id/:packageId",tokenVerification.verifyToken,favourateController.deleteOnefavourate);

router.get("/allfooditems",tokenVerification.verifyToken,foodPackages.viewallfoodlist);
router.post("/foodbyname",tokenVerification.verifyToken,foodPackages.viewfoodbynamelist);
router.get("/packages/:id",tokenVerification.verifyToken,foodPackages.viewcategorylist);

router.post("/updateprofile",tokenVerification.verifyToken,userController.updateprofile);

router.post("/order",tokenVerification.verifyToken,orderController.order);

router.get("/orderhistory/:id",tokenVerification.verifyToken,orderController.orderhistory);

router.post("/placeorder",tokenVerification.verifyToken,orderController.placeOrder)

module.exports=router;