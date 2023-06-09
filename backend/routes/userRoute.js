const express=require('express');

const user_route=express();

const bodyparser=require('body-parser');
user_route.use(bodyparser.json());
user_route.use(bodyparser.urlencoded({extended:true}));

user_route.use(express.static('public'));

const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../public/images'),function(error,success){
            if(error){
                console.log(error);
            }
        });
    },
    filename:function(req,file,cb){
        const name=Date.now()+'-'+file.originalname;
        cb(null,name,function(error,success){
            if(error){
                console.log(error);
            }
        });
    }
});

const upload=multer({storage:storage});

const {createUser,getUser,deleteUser,updateUser}=require("../controllers/userController")

user_route.post('/create-user',upload.single('image'),createUser);
user_route.get('/get-users',getUser);
user_route.post('/delete-user',deleteUser);
user_route.post('/update-user',upload.single('image'),updateUser);



module.exports=user_route;