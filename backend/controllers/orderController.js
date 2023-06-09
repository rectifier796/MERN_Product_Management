const Order=require("../models/orderModel");

const createOrder=async(req,res)=>{
    try{

        const order=new Order({
            user_id:req.body.user_id,
            product_id:req.body.product_id
        });

        const data=await order.save();
        res.status(200).send({
            success:true,
            message:"Order Created Successfully",
            data:data
        })

    }
    catch(err){
        res.status(400).send({
            success:false,
            message:err.message
        })
    }
}

const getOrders=async(req,res)=>{
    try{

        var orders;

        if(req.body.user_id!==undefined){
            orders=await Order.find({user_id:req.body.user_id});
        }else{
            orders=await Order.find({});
        }
        
        res.status(200).send({
            success:true,
            message:"Order List",
            data:orders
        })

    }
    catch(err){
        res.status(400).send({
            success:false,
            message:err.message
        })
    }
}


module.exports={createOrder,getOrders}