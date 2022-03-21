const mongoose = require('mongoose');
const schema = mongoose.Schema;
const OrderSchema =new mongoose.Schema({
    userId:schema.Types.ObjectId,
    orderItem:[{
        type:schema.Types.ObjectId,
        ref:'foodPackages'
    }],
    address:{
        type:String,
        req:true,
    },
    total:{
        type:Number,
        req:true
    },
    price:{
        type:Number,
        req:true 
    },
    Qty:{
        type:Number,
        req:true
    },
    payment:{
        type:String,
        req:true
    }
},{timestamps:true})

module.exports=mongoose.model('orders',OrderSchema)