const User=require('../model/user.model');
// const {validationResult} = require('express-validator');
const { response } = require('express');
const { replaceOne } = require('../model/user.model');

exports.signup=(request,response)=>{
    
    let username=request.body.username;
    let email=request.body.email;
    let password=request.body.password;
    let mobile=request.body.mobile;

    User.create({
        username:username,
        email:email,
        password:password,
        mobile:mobile
    }).then(result=>{
        console.log(result);
        return response.status(201).json(result);
    }).catch(err=>{
        console.log(err);
    });
}

exports.signin=(request,response)=>{
    
    User.findOne({
        email:request.body.email,
        password:request.body.password
    })
    .then(result=>{
       if(result)
        return response.status(200).json(result);
       else
       return response.status(404).json({message:"Invalid user"});
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({message:"Oops!something went wrong"});

    });
}

exports.viewusers=(request,response)=>{
    User.find()
    .then(results=>{
        console.log(results);
        return response.status(200).json(results)
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({message:"Error"})
    })
}
exports.updateprofile=(request,response)=>{
    Priest.updateOne({_id:request.body.id},
       {
         $set:{
           username:request.body.username,
           email:request.body.email,
           password:request.body.password,
           mobile:request.body.mobile
         }
       }
     )
    .then(result=>{
      console.log(result)
       if(result.modifiedCount)
         return response.status(202).json({message:"update  success..."});
       else
         return response.status(204).json({message:"not updated...."});
    })
    .catch(err=>{
      console.log(err);
      return response.status(500).json({message:"something went wrong"})
    })
 }