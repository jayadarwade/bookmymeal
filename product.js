const Order = require("../model/order")
const foodpackage = require('../model/PackacgeAndItems.model')

exports.placeOrder = (req, res) => {

    console.log(req.body)
    console.log(req.body.orderedItem[0])
    console.log(req.body.orderedItem.length)
    foodpackage.find().then((result) => {
    var total = 0;
        console.log(result)
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < req.body.orderedItem.length; j++) {
                console.log(result[0]._id)
                console.log(req.body.orderedItem[0].ProductId)
                if (result[i]._id == req.body.orderedItem[j].ProductId) {
                    console.log("inn")
                    total += result[i].packageprice * req.body.orderedItem[j].Qty

                }
            }
        }
        const order = new Order({
            userId: req.body.uid,
            address: req.body.add,
            orderDate: new Date().toISOString(),
            orderTotal: total
        })
        for (let i = 0; i < req.body.orderedItem.length; i++)
            order.orderedItem.push(req.body.orderedItem[i])


        order.save().then((result) => {
            console.log(result)
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        })


    })


}

exports.orderHistory = (req,res)=>{

    Order.find({userId:req.body.id}).populate('orderedItem.ProductId').then((result)=>{
        res.status(200).json(result)
     
    }).catch((err)=>{
        res.status(500).json(err)
    })
}