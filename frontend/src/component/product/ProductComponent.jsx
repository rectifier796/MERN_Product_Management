import React from "react";
import LayoutComponent from "../LayoutComponent";

import { useState, useEffect } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";

import UserService from "../../services/userService";
import ProductService from "../../services/productService";

function ProductComponent() {
  const [createShow, setCreateShow] = useState(false);
  const [users, setUsers] = useState({});

  const fetchUsers = async () => {
    setUsers(await UserService.getUsers());
  };

  const createModal = () => {
    return setCreateShow(!createShow);
  };

  const [userId,setUserId]=useState('');
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const [productSelectedFile,setProductSelectedFile]=useState('');

  const createFormSubmit=async(event)=>{
    event.preventDefault();

    if(productSelectedFile.length>5){
      alert('Only One Product has 5 Images allowed!!');
      return false;
    }

    const formData=new FormData();
    formData.append('user_id',userId);
    formData.append('name',name);
    formData.append('price',price);

    if(productSelectedFile != '' && productSelectedFile.length !=0){
      for(let i=0;i<productSelectedFile.length;i++){
        formData.append('images',productSelectedFile[i]);
      }
    }

    const response=await ProductService.create(formData);

    if(response.data.success==true){
      alert(response.data.message)
    }
    else{
      alert(response.data.message)
    }

    fetchProducts();
    createModal();
  }

  //get products
  const [products,setProducts]=useState({});

  const fetchProducts=async()=>{
    setProducts(await ProductService.getProducts())
  }

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  //Show Product Images
  const [productImageShow,setProductImageShow]=useState(false);
  const [productImages,setProductImages]=useState([]);

  const productImageModel=()=>{
    return setProductImageShow(!productImageShow);
  }

  const productImagesStore=(images)=>{
    setProductImages(images);
    productImageModel();
  }

  //deleteProduct
  const deleteProduct=async(product_id)=>{
    const formData=new FormData();
    formData.append("id",product_id);
    const response = await ProductService.delete(formData);
    alert(response.data.message);
    fetchProducts();
  }

  const editProduct=async()=>{

  }

  return (
    <div className="wrapper d-flex align-items-stretch">
      <LayoutComponent />
      <div id="content" className="p-4 p-md-5 pt-5">
        <h2 className="mb-4">Products</h2>

        {/* Add Product Modal */}

        <Button variant="success" onClick={createModal} className="mb-2">
          Add Product
        </Button>

        <Modal show={createShow}>
          <Modal.Header>
            <Modal.Title>Add Product</Modal.Title>
            <CloseButton onClick={createModal} className="btn">
              X
            </CloseButton>
          </Modal.Header>

          <form onSubmit={createFormSubmit}>
            <Modal.Body>
              <select name="user_id" required className="w-100 mb-3" onChange={event=>setUserId(event.target.value)}>
                <option value="">Select User</option>
                {users.data !== undefined &&
                  users.data.data.length > 0 &&
                  users.data.data.map((user) => {
                    return <option value={user._id}>{user.name}</option>;
                  })}
              </select>

              <input
                type="text"
                name="name"
                placeholder="Enter Product Name"
                onChange={(event) => setName(event.target.value)}
                className="w-100 mb-3"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Enter Product Price"
                onChange={(event) => setPrice(event.target.value)}
                className="w-100 mb-3"
                required
              />

              <input
                type="file"
                name="images"
                onChange={(event) => setProductSelectedFile(event.target.files)}
                className="w-100 mb-3"
                multiple
                required
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={createModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* Product Show */}

        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>User Name</th>
              <th>Price</th>
              <th>Images</th>
              <th>Delete</th>
              {/* <th>Edit</th> */}
            </tr>
          </thead>

          {products.data !== undefined && products.data.data.length > 0 && (
            <tbody>
              {products.data.data.map((product) => (
                <tr>
                  <td>{product.name}</td>
                  <td>{product.user[0].name}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <a style={{color:"blue",cursor:"pointer"}} onClick={event=>productImagesStore(product.images)}>Images</a>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={event=>deleteProduct(product._id)}>Delete</button>
                  </td>
                  <td>
                    <button className="btn btn-warning" onClick={event=>editProduct(product._id,product.name,product.price)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {/* Product Images Show Modal */}
        <Modal show={productImageShow}>
          <Modal.Header>
            <Modal.Title>Product Images</Modal.Title>
            <CloseButton onClick={productImageModel} className="btn">
              X
            </CloseButton>
          </Modal.Header>

                <Modal.Body>
                  {productImages.map(image=>(
                    <img src={"http://localhost:8000/api/"+image} width="150px" height="150px" alt="Product Images"/>
                  ))}
                </Modal.Body>
        
            <Modal.Footer>
              <Button variant="dark" onClick={productImageModel}>
                Close
              </Button>
            </Modal.Footer>

        </Modal>

      </div>
    </div>
  );
}

export default ProductComponent;
