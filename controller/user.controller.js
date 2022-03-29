const User = require("../model/user.model");
const { validationResult } = require("express-validator");

exports.signup = (request, response) => {
  User.create({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
    mobile: request.body.mobile,
  })
    .then((result) => {
      console.log(result);
      return response.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({message:'wrong'});
    });
};

exports.signin = (request, response) => {
  User.findOne({
    email: request.body.email,
    password: request.body.password,
  })
    .then((result) => {
      if(result.isblock==false){
        return response.status(404).json(result)
      }
      else 
        return response.status(404).json({ message: "block user" });
    })
    .catch((err) => {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Oops!something went wrong" });
    });
};

exports.viewusers = (request, response) => {
  User.find()
    .then((results) => {
      console.log(results);
      return response.status(200).json(results);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ message: "Error" });
    });
};
exports.updateprofile = (request, response) => {
  User.updateOne(
    { _id: request.body.id },
    {
      $set: {
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        mobile: request.body.mobile,
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

exports.addtoblock = (requist, response) => {
  User.updateOne(
    { _id: requist.params.id },
    {
      $set: {
        isblock: true,
      },
    }
  )
    .then((result) => {
      if (result.modifiedCount)
      return response.status(202).json({ message: "block user..." });
    else return response.status(204).json({ message: "not block user...." });
  })
  .catch((err) => {
    console.log(err);
    return response.status(500).json({ message: "something went wrong" });
  });
};

exports.removefromblock = (requist, response) => {
  User.updateOne(
    { _id: requist.params.id },
    {
      $set: {
        isblock: false,
      },
    }
  )
    .then((result) => {
      if (result.modifiedCount)
        return response.status(202).json({ message: "remove from block..." });
      else return response.status(204).json({ message: "not remove...." });
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ message: "something went wrong" });
    });
};

// exports.emailverification = (request, response) => {
//   let sender = "jayadarwade524@gmail.com";
//   let reciever = request.body.email;
//   let subject = "verification";
//   let message ='hello jaya'

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: sender,
//       pass: "password",
//     },
//   });

//   // email options
//   let mailOptions = {
//     from: sender,
//     to: reciever,
//     subject: 'verification',
//     text:'hello',
//   };
// }