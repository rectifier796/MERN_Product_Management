const productModel = require('../models/productModel');
const Product=require('../models/productModel');

const addProduct=async(req,res)=>{
    try{
        var arrImages=[];
        for(let i=0;i<req.files.length;i++){
            arrImages[i]='/productImages/'+req.files[i].filename;
        }

        var product=new Product({
            user_id: req.body.user_id,
            name:req.body.name,
            price:req.body.price,
            images:arrImages
        });

        const productData = await product.save();

        res.status(200).send({
            success:true,
            message:"Product Details Added",
            data:productData
        })

    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

const getProduct=async(req,res)=>{
    try{

        const products=await Product.find({user_id:req.body.user_id});

        return res.status(200).json({
            success:true,
            message:'Product Details',
            data:products
        })

    }
    catch(err){
        res.status(400).json({success:false,
        message:err.message
        })
    }
}

const deleteProduct=async(req,res)=>{
    try{
        await Product.deleteOne({_id:req.body.id});

        res.status(200).send({
            success:true,
            message:"Product Deleted Successfully"
        })

    }
    catch(err){
        return res.status(400).json({success:false,
        message:err.message
        });
    }
}

const updateProduct=async(req,res)=>{
    try{

        var dataObj;
        var arrImages=[];
        if(req.files.length>0){
            for(let i=0;i<req.files.length;i++){
                arrImages[i]='/productImages/'+req.files[i].filename;
            }
            dataObj={
                name:req.body.name,
                price:req.body.price,
                images:arrImages
            }
        }
        else{
            dataObj={
                name:req.body.name,
                price:req.body.price,
            }
        }

        const updatedProduct=await Product.findByIdAndUpdate({_id:req.body.id},{$set:dataObj},{new:true});

        res.status(200).json({
            success:true,
            message:'Product Updated Successfully',
            data:updateProduct
        })

    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

const products=async(req,res)=>{
try{

    var data=await productModel.aggregate([
        {
            $lookup:{
                from:"users",
                localField:"user_id",
                foreignField:"_id",
                as:"user"
            }
        }
    ])

    res.status(200).json({
        success:true,
        message:"Products Data",
        data:data
    })

}
catch(err){
    res.status(400).json({
        success:false,
        message:err.message
    })
}
}


module.exports={addProduct,getProduct,deleteProduct,updateProduct,products}