const Favourate = require("../model/favourate.model");
const { validationResult } = require("express-validator");

exports.addtofavourate = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  var favourate = await Favourate.findOne({ userId: request.body.userId });

  if (!favourate) favourate = new Favourate({ userId: request.body.userId });

  favourate.foodList.push(request.body.productId);
  favourate
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

exports.viewfavourateone = (request, response) => {
  Favourate.findOne({ _id: request.params.id })
    .populate("foodList")
    .then((results) => {
      console.log(results);
      return response.status(200).json(results);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ message: "not found" });
    });
};

exports.deletefavourate = (request, response) => {
  Favourate.deleteOne({ _id: request.params.id })
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

exports.deleteOnefavourate = (request, response) => {
  Favourate.updateOne(
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
