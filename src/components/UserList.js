import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userServices";
import { Link } from "react-router-dom";
import "../index.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      const success = await deleteUser(id);
      if (success) {
        setUsers(users.filter((user) => user.id !== id));
      }
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container mt-6">
      <div className="box">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-half">
            <h2 className="title is-3">User Management</h2>
          </div>
          <div className="column is-half has-text-right">
            <Link to="/add-user">
              <button className="button is-primary">Add User</button>
            </Link>
          </div>
        </div>

        <table className="table is-fullwidth is-striped is-hoverable">
          <thead className="has-background-info has-text-black">
            <tr>
              <th className="has-text-centered">ID</th>
              <th className="has-text-centered">First Name</th>
              <th className="has-text-centered">Last Name</th>
              <th className="has-text-centered">Email</th>
              <th className="has-text-centered">Department</th>
              <th className="has-text-centered">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="has-text-centered">{user.id}</td>
                <td className="has-text-centered">{user.name.split(" ")[0]}</td>
                <td className="has-text-centered">{user.name.split(" ")[1] || "N/A"}</td>
                <td className="has-text-centered">{user.email}</td>
                <td className="has-text-centered">{user.company.name}</td>
                <td className="has-text-centered">
                  <Link to={`/edit-user/${user.id}`}>
                    <button className="button is-warning mr-2">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="button is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="is-flex is-justify-content-center mt-4">
          <button
            className="button is-light mr-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="button is-light"
            disabled={currentPage * usersPerPage >= users.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
