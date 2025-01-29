import React, { useState, useEffect } from "react";
import { addUser, editUser, getUsers } from "../api/userServices";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = ({ isEditing }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  
    useEffect(() => {
      if (isEditing) {
        getUsers().then((data) => {
          const existingUser = data.find((u) => u.id === parseInt(id));
          if (existingUser) {
            setUser({
              firstName: existingUser.name.split(" ")[0],
              lastName: existingUser.name.split(" ")[1] || "",
              email: existingUser.email,
              department: existingUser.company.name,
            });
          }
        });
      }
    }, [id, isEditing]);
  
    const handleSubmit = async (e) => {
        console.log(user, id);
        
      e.preventDefault();
      if (isEditing) {
        await editUser(id, user);
      } else {
        await addUser(user);
      }
      navigate("/");
    };
  
    return (
      <div className="container is-flex is-justify-content-center is-align-items-center p-4">
        <div className="box">
          <h2 className="title is-3 has-text-centered">{isEditing ? "Edit User" : "Add User"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="input is-medium"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="input is-medium"
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="input is-medium"
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={user.department}
              onChange={(e) => setUser({ ...user, department: e.target.value })}
              className="input is-medium"
            />
            <button
              type="submit"
              className="button is-link is-fullwidth"
            >
              {isEditing ? "Update User" : "Add User"}
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default UserForm;
