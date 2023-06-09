require('dotenv').config();

const url=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.7fk4ubh.mongodb.net/?retryWrites=true&w=majority`;
const mongoose=require('mongoose');
mongoose.connect(url)
.then(function(){
    console.log("Database Connected")
})
.catch((err)=>{
    console.log(err);
});

const express=require('express');
const app=express();
const cors=require('cors');

const user_route=require("./routes/userRoute");
const product_route=require("./routes/productRoutes");
const order_route=require("./routes/orderRoutes");

app.use(cors({
    origin:'*',
}));

app.use('/api',user_route);
app.use('/api',product_route);
app.use('/api',order_route);

const port=8000;
app.listen(port,function(){
    console.log(`Server is running on port ${port}`);
})