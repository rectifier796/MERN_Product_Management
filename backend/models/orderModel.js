const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    product_id:{
        type:String,
        require:true
    }
},{ timestamps: true });

module.exports=mongoose.model('Order',orderSchema);