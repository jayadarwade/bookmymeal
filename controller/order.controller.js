const order = require("../model/order.model");
const product = require("../model/foodpackage.model");
exports.order = (requiest, response) => {
  product
    .findOne({ _id: requiest.body.productid })
    .then((result) => {
      console.log(result.orderItem);
      console.log(result);
      let total = result.packageprice * requiest.body.Qty;
      order
        .create({
          userid: requiest.body.userid,
          address: requiest.body.address,
          total: total,
          price: result.packageprice,
          orderItem: {
            productid: requiest.body.productid,
            Qty: requiest.body.Qty,
          },
          //Qty: requiest.body.Qty * 1,
          payment: requiest.body.payment,
        })
        .then((result) => {
          console.log(result);
          return response.status(201).json(result);
        })
        .catch((err) => {
          console.log(err);
          return response.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ mesaage: "something went wrong" });
    });
};

exports.allorderhistory = (requiest, response) => {
  order
    .find()
    .then((result) => {
      console.log(result);
      return response.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ messagge: "wrong" });
    });
};

exports.orderhistory = (requiest, response) => {
  order
    .find({ _id: requiest.params.id })
    .then((result) => {
      console.log(result);
      return response.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ messagge: "wrong" });
    });
};

// const Order = require("../model/order")
// const foodpackage = require('../model/PackacgeAndItems.model')

exports.placeOrder = (req, res) => {
  console.log(req.body);
  console.log(req.body.orderItem[0]);
  console.log(req.body.orderItem.length);
  product.find().then((result) => {
    var total = 0;
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < req.body.orderItem.length; j++) {
        console.log(result[0]._id);
        console.log(req.body.orderItem[0].productid);
        if (result[i]._id == req.body.orderItem[j].productid) {
          console.log("inn");
          total += result[i].packageprice * req.body.orderItem[j].Qty;
        }
      }
    }
    const Order = new order({
      userId: req.body.userId,
      address: req.body.address,
      //orderDate: new Date().toISOString(),
      total: total,
    });
    for (let i = 0; i < req.body.orderItem.length; i++)
      Order.orderItem.push(req.body.orderItem[i]);
    Order.save()
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
};

// exports.orderHistory = (req,res)=>{

//     Order.find({userId:req.body.id}).populate('orderedItem.ProductId').then((result)=>{
//         res.status(200).json(result)

//     }).catch((err)=>{
//         res.status(500).json(err)
//     })
// }
