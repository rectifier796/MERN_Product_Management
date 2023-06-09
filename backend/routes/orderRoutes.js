const express=require('express');

const order_route=express();

const bodyparser=require('body-parser');
order_route.use(bodyparser.json());
order_route.use(bodyparser.urlencoded({extended:true}));

const {createOrder,getOrders}=require("../controllers/orderController")

order_route.post('/create-order',createOrder);
order_route.post('/get-order',getOrders);

module.exports=order_route;