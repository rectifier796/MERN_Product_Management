import axios from "axios";

class User{
    create(formData){
        const url="http://localhost:8000/api/create-user";
        const config={
            headers:{
                'Content-Type':'multipart/form-data',
            }
        };

        return axios.post(url,formData,config);
    }

    getUsers(){
        const url="http://localhost:8000/api/get-users";
        return axios.get(url);
    }

    deleteUser(formData){
        const url="http://localhost:8000/api/delete-user";
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        return axios.post(url,formData,config);
    }

    update(formData){
        const url="http://localhost:8000/api/update-user";
        const config={
            headers:{
                'Content-Type':'multipart/form-data',
            }
        };

        return axios.post(url,formData,config);
    }
}

export default new User();