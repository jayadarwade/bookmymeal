const order = require("../model/order.model");
const product = require("../model/foodpackage.model");
const res = require("express/lib/response");
exports.order = (requiest, response) => {
  product
    .findOne({ _id: requiest.body.orderItem })
    .then((result) => {
      console.log(result);
      let total = result.packageprice * requiest.body.Qty;
      order
        .create({
          userid: requiest.body.userid,
          address: requiest.body.address,
          total: total,
          price: result.packageprice,
          orderItem: requiest.body.orderItem,
          Qty: requiest.body.Qty,
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
      return res.status(500).json({ mesaage: "something went wrong" });
    });
};

exports.orderhistory = (requiest, response) => {
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
