import axios from "axios";

class Product{

    create(formData){
        const url="http://localhost:8000/api/add-product";
        const config={
            headers:{
                'Content-Type':'multipart/form-data',
            }
        };

        return axios.post(url,formData,config);
    }

    getProducts(){
        const url="http://localhost:8000/api/products";
       return axios.get(url);
    }

    delete(formData){
        const url="http://localhost:8000/api/delete-product";
        const config={
            headers:{
                'Content-Type':'application/json',
            }
        };

        return axios.post(url,formData,config);
    }
}

export default new Product;