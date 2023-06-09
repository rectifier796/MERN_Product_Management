const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        validate:[arrayLimit,'You can pass only 5 product images']
    }
});

function arrayLimit(val){
    return val.length <= 5;
}

module.exports=mongoose.model('Product',productSchema);