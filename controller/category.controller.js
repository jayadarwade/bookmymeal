const Category = require("../model/category.model");
const { validationResult } = require("express-validator");

exports.addCategory = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  Category.create({
    categoryname: request.body.categoryname,
    categoryimage: "http://bookmymealjaya.herokuapp.com/images/" + request.file.filename,
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

exports.viewcategory = (request, response, next) => {
  Category.find()
    .then((results) => {
      return response.status(200).json(results);
    })
    .catch((err) => {
      return response.status(500).json({ message: "not found" });
    });
};

exports.deletecategory = (request, response, next) => {
  Category.deleteOne({ _id: request.params.id })
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

exports.updatecategory = (request, response) => {
  Category.updateOne(
    { _id: request.params.id },
    {
      $set: {
        categoryname: request.body.categoryname,
        categoryimage: "http://localhost:3000/images/" + request.file.filename,
      },
    }
  )
    .then((result) => {
      if (result.modifiedCount)
        return response.status(202).json({ message: "update  success..." });
      else return response.status(404).json({ message: "not updated...." });
    })
    .catch((err) => {
      return response.status(500).json({ message: "something went wrong" });
    });
};
