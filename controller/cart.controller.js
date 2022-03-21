const Cart = require("../model/cart.model");
const { validationResult } = require("express-validator");
const { response } = require("express");

exports.addToCart = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  var cart = await Cart.findOne({ userId: request.body.userId });

  if (!cart) cart = new Cart({ userId: request.body.userId });

  cart.foodList.push(request.body.productId);
  cart
    .save()
    .then((results) => {
      console.log(results);
      return response.status(201).json(results);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ message: "something went wrong" });
    });
};

// exports.viewcart=(request,response)=>{
//     Cart.find()
//     .then(results=>{
//       return response.status(200).json(results);
//     })
//     .catch(err=>{
//       return response.status(500).json({message:"not found"})
//     });
//   }

exports.viewcartone = (request, response) => {
  Cart.findOne({ userId: request.params.id })
    .populate("foodList")
    .then((results) => {
      return response.status(200).json(results);
    })
    .catch((err) => {
      return response.status(500).json({ message: "not found" });
    });
};

exports.deletecart = (request, response) => {
  Cart.deleteOne({ _id: request.params.id })
    .then((result) => {
      if (result.deletedCount)
        return response.status(202).json({ message: "delete success" });
      else return response.status(204).json({ message: "not deleted" });
    })
    .catch((err) => {
      return response
        .status(500)
        .json({ message: "Oops! something went wrong" });
    });
};

exports.deleteOneProduct = (request, response) => {
  Cart.updateOne(
    { _id: request.params.id },
    {
      $pullAll: {
        foodList: [
          {
            _id: request.params.packageId,
          },
        ],
      },
    }
  )
    .then((result) => {
      console.log(result);
      if (result.modifiedCount)
        return response.status(202).json({ message: "update  success..." });
      else return response.status(404).json({ message: "not updated...." });
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ message: "something went wrong" });
    });
};
