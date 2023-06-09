import React from "react";
import LayoutComponent from "../LayoutComponent";

import { useState, useEffect } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";

import UserService from "../../services/userService";
import userService from "../../services/userService";

function UserComponent() {

  const [createShow, setCreateShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  //create user data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mno, setMobile] = useState("");
  const [userSelectedFile, setUserSelectedFile] = useState("");

  //get all user's data
  const [users, setUsers] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setUsers(await UserService.getUsers());
  };

  const createModal = () => {
    return setCreateShow(!createShow);
  };

  const updateModal=()=>{
    return setUpdateShow(!updateShow);
  }

  const createFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("mno", mno);

    if (userSelectedFile !== "" && userSelectedFile.length !== 0) {
      formData.append("image", userSelectedFile);
    }

    const response = await userService.create(formData);
    if (response.data.success === true) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
    }
    createModal();
    fetchUsers();
  };

  const deleteUser=async(user_id)=>{
    const formData=new FormData();
    formData.append('user_id',user_id);

    const response = await UserService.deleteUser(formData);
    if(response.data.success==true){
        alert(response.data.message);
    }
    else{
      alert(response.data.message);
    }
    fetchUsers();
  }

  //update user data
  const [userId,setUserId]=useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateMobile, setUpdateMobile] = useState("");
  const [userUpdateSelectedFile, setUpdateUserSelectedFile] = useState("");

  const editUser=(id,name,email,mno)=>{
    setUserId(id);
    setUpdateName(name);
    setUpdateEmail(email);
    setUpdateMobile(mno);
    updateModal();
  }

  const updateFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("user_id",userId)
    formData.append("name", updateName);
    formData.append("email", updateEmail);
    formData.append("mno", updateMobile);

    if (userUpdateSelectedFile !== "" && userUpdateSelectedFile.length !== 0) {
      formData.append("image", userUpdateSelectedFile);
    }

    const response = await userService.update(formData);
    if (response.data.success === true) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
    }
    updateModal();
    fetchUsers();
  };



  return (
    <div className="wrapper d-flex align-items-stretch">
      <LayoutComponent />
      <div id="content" className="p-4 p-md-5 pt-5">
        <h2 className="mb-4">Users</h2>

        <Button variant="success" onClick={createModal} className="mb-2">
          Create User
        </Button>

        <Modal show={createShow}>
          <Modal.Header>
            <Modal.Title>Create User</Modal.Title>
            <CloseButton onClick={createModal} className="btn">
              X
            </CloseButton>
          </Modal.Header>

          <form onSubmit={createFormSubmit}>
            <Modal.Body>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={(event) => setName(event.target.value)}
                className="w-100 mb-3"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={(event) => setEmail(event.target.value)}
                className="w-100 mb-3"
                required
              />
              <input
                type="number"
                name="mno"
                placeholder="Enter Mobile"
                onChange={(event) => setMobile(event.target.value)}
                className="w-100 mb-3"
                required
              />
              <input
                type="file"
                name="image"
                className="w-100 mb-3"
                onChange={(event) => setUserSelectedFile(event.target.files[0])}
                required
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="dark" onClick={createModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/*{Show users data in table} */}
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Image</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>

          {users.data !== undefined && users.data.data.length > 0 && (
            <tbody>
              {users.data.data.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mno}</td>
                  <td>
                    <img
                      src={"http://localhost:8000/api/" + user.image}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={event=>deleteUser(user._id)}>Delete</button>
                  </td>
                  <td>
                    <button className="btn btn-warning" onClick={event=>editUser(user._id,user.name,user.email,user.mno)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {/* Update User Modal */}

        <Modal show={updateShow}>
          <Modal.Header>
            <Modal.Title>Update User</Modal.Title>
            <CloseButton onClick={updateModal} className="btn">
              X
            </CloseButton>
          </Modal.Header>

          <form onSubmit={updateFormSubmit}>
            <Modal.Body>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={updateName}
                onChange={(event) => setUpdateName(event.target.value)}
                className="w-100 mb-3"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={updateEmail}
                onChange={(event) => setUpdateEmail(event.target.value)}
                className="w-100 mb-3"
                required
              />
              <input
                type="number"
                name="mno"
                placeholder="Enter Mobile"
                value={updateMobile}
                onChange={(event) => setUpdateMobile(event.target.value)}
                className="w-100 mb-3"
                required
              />
              <input
                type="file"
                name="image"
                className="w-100 mb-3"
                onChange={(event) => setUpdateUserSelectedFile(event.target.files[0])}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="dark" onClick={updateModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Modal.Footer>
          </form>
        </Modal>


      </div>
    </div>
  );
}

export default UserComponent;
