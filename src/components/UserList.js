import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userServices";
import { Link } from "react-router-dom";
import '../index.css';

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

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container is-fluid p-4">
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
        <h2 className="title is-3 mb-0">User Management</h2>
        <Link to="/add-user">
          <button className="button add-user">Add User</button>
        </Link>
      </div>
      <div className="table-container">
        <table className="table is-fullwidth is-bordered is-hoverable">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name.split(" ")[0]}</td>
                <td>{user.name.split(" ")[1] || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>
                  <div className="buttons">
                    <Link to={`/edit-user/${user.id}`}>
                      <button className="button edit-user">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="button delete-user"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="pagination is-centered mt-4" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
          {pageNumbers.map((number) => (
            <li key={number} className="is-transparent">
              <a
                className={`pagination-link ${number === currentPage ? 'is-current' : ''}`}
                onClick={() => setCurrentPage(number)}
                aria-label={`Go to page ${number}`}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserList;
