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
    e.preventDefault();
    if (isEditing) {
      await editUser(id, user);
    } else {
      await addUser(user);
    }
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="title">{isEditing ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Department</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Department"
              value={user.department}
              onChange={(e) => setUser({ ...user, department: e.target.value })}
            />
          </div>
        </div>

        <button className="button is-primary is-fullwidth">
          {isEditing ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
