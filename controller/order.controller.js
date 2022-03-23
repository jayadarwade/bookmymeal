const order = require("../model/order.model");
const product = require("../model/foodpackage.model");
exports.order = (requiest, response) => {
  product
    .findOne({ _id: requiest.body.productid })
    .then((result) => {
      console.log(result.orderItem)
      console.log(result);
      let total = result.packageprice * requiest.body.Qty;
      order
        .create({
          userid: requiest.body.userid,
          address: requiest.body.address,
          total: total,
          price: result.packageprice,
          orderItem: {productid:requiest.body.productid,Qty:requiest.body.Qty},
          Qty: requiest.body.Qty*1,
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
    .find({_id:requiest.params.id})
    .then((result) => {
      console.log(result);
      return response.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ messagge: "wrong" });
    });
};