const foodpackage = require("../model/foodpackage.model");
const { validationResult } = require("express-validator");

exports.addfoodpackage = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  foodpackage
    .create({
      packagename: request.body.packagename,
      packageprice: request.body.packageprice,
      packageqty: request.body.packageqty,
      packageDescription: request.body.packageDescription,
      foodimage: "http://localhost:3000/images/" + request.file.filename,
      categoryId: request.body.categoryId,
    })
    .then((result) => {
      return response.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      return response
        .status(403)
        .json({ message: "opps something went wrong!" });
    });
};

exports.viewallfoodlist = (request, response, next) => {
  foodpackage
    .find()
    .then((results) => {
      return response.status(200).json(results);
    })
    .catch((err) => {
      return response.status(500).json({ message: "not found" });
    });
};

exports.viewfoodbynamelist = (request, response, next) => {
  foodpackage
    .find({ packagename: request.body.packagename })
    .then((results) => {
      return response.status(200).json(results);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ message: "not found" });
    });
};

exports.viewcategorylist = (request, response, next) => {
  foodpackage
    .find({ categoryId: request.params.id })
    .then((results) => {
      return response.status(200).json(results);
    })
    .catch((err) => {
      return response.status(500).json({ message: "not found" });
    });
};

exports.deletefoodpackage = (request, response, next) => {
  foodpackage
    .deleteOne({ _id: request.params.id })
    .then((result) => {
      console.log(result);
      if (result.deletedCount)
        return response.status(202).json({ message: "delete success" });
      else return response.status(204).json({ message: "not deleted" });
    })
    .catch((err) => {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Oops! something went wrong" });
    });
};

exports.updatefoodpackage = (request, response) => {
  foodpackage
    .updateOne(
      { _id: request.params.id },
      {
        $set: {
          packagename: request.body.packagename,
          packageprice: request.body.packageprice,
          packageqty: request.body.packageqty,
          packageDescription: request.body.packageDescription,
          foodimage: "http://localhost:3000/images/" + request.file.filename,
        },
      }
    )
    .then((result) => {
      console.log(result);
      if (result.modifiedCount)
        return response.status(202).json({ message: "update  success..." });
      else return response.status(204).json({ message: "not updated...." });
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ message: "something went wrong" });
    });
};
