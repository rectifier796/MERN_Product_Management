const express=require('express');

const product_route=express();

const bodyparser=require('body-parser');
product_route.use(bodyparser.json());
product_route.use(bodyparser.urlencoded({extended:true}));

product_route.use(express.static('public'));

const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../public/productImages'),function(error,success){
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

const {addProduct,getProduct,deleteProduct,updateProduct,products}=require("../controllers/productController")

product_route.post('/add-product',upload.array('images'),addProduct);
product_route.post('/get-product',getProduct);
product_route.post('/delete-product',deleteProduct);
product_route.post('/update-product',upload.array('images'),updateProduct);
product_route.get('/products',products);



module.exports=product_route;