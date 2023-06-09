const User=require('../models/userModel');

const createUser=async(req,res)=>{
    try{

        // console.log(req.body.email);
        const checkUser=await User.findOne({email:req.body.email});

        // console.log(checkUser);

        if(checkUser){
            return res.status(200).send({success: false, message:"Email Already Exist"});
        }

        const user=new User({
            name:req.body.name,
            email:req.body.email,
            mno:req.body.mno,
            image:'/images/'+req.file.filename
        });

        const userData=await user.save();
        res.status(200).send({
            success:true,
            message:'User Data Added Successfully',
            data:userData
        })

    }catch(error){
        res.status(400).send({
            success:false,
            message:error.message
        })
    }
}

const getUser=async(req,res)=>{
    try{

        const allUsers=await User.find({});

        res.status(200).json({
            success:true,
            message:"User's Data",
            data:allUsers
        })

    }catch(e){
        res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

const deleteUser=async(req,res)=>{
    try{

        await User.deleteOne({_id:req.body.user_id});

        res.status(200).send({
            success:true,
            message:"User Deleted Successfully"
        })

    }
    catch(e){
        res.json({
            success:false,
            message:e.message
        })
    }
}

const updateUser=async(req,res)=>{
    try{
        var user_id=req.body.user_id;

        var obj;

        if(req.file !== undefined){
            obj={
                name:req.body.name,
                email:req.body.email,
                mno:req.body.mno,
                image:'/images/'+req.file.filename
            }
        }
        else{
            obj={
                name:req.body.name,
                email:req.body.email,
                mno:req.body.mno
            }
        }

        var updatedData=await User.findByIdAndUpdate({_id:user_id},{$set:obj},{new:true});

        res.status(200).send({
            success:true,
            message:'User Updated Successfully',
            data:updatedData
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

module.exports={createUser,getUser,deleteUser,updateUser}