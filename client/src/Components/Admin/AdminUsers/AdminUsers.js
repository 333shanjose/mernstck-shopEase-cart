import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchAdminUsers,
  deleteAdminUser,
  toggleBlockAdminUser
} from "../../../reduxSlice/AdminUserSlice";

import "./AdminUsers.css";


const AdminUsers = () => {

  const dispatch = useDispatch();


  const {
    users,
    loading,
    error
  } = useSelector(
    (state) => state.adminUsers
  );


  const [search, setSearch] = useState("");


  // ============================
  // FETCH USERS
  // ============================

  useEffect(() => {

    dispatch(fetchAdminUsers());

  }, [dispatch]);


  // ============================
  // DELETE USER
  // ============================

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    dispatch(deleteAdminUser(id));
  };


  // ============================
  // BLOCK / UNBLOCK
  // ============================

  const handleBlock = (id, isBlocked) => {

    const message = isBlocked
      ? "Do you want to unblock this user?"
      : "Do you want to block this user?";


    const confirmAction =
      window.confirm(message);


    if (!confirmAction) {
      return;
    }


    dispatch(toggleBlockAdminUser(id));
  };


  // ============================
  // SEARCH
  // ============================

  const filteredUsers = users.filter((user) => {

    const searchText =
      search.toLowerCase();

    return (
      user.name
        ?.toLowerCase()
        .includes(searchText) ||

      user.email
        ?.toLowerCase()
        .includes(searchText)
    );

  });


  return (

    <div className="admin-users">
        
        

      {/* HEADER */}

      <div className="users-header">

        <div>

          <h1>
            Users
          </h1>

          <p>
            Manage registered users
          </p>

        </div>


        <div className="user-count">

          Total Users:
          <strong>
            {users.length}
          </strong>

        </div>

      </div>


      {/* SEARCH */}

      <div className="users-toolbar">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* ERROR */}

      {error && (

        <div className="error-message">
          {error}
        </div>

      )}


      {/* LOADING */}

      {loading && (

        <div className="loading">
          Loading users...
        </div>

      )}


      {/* TABLE */}

      {!loading && (

        <div className="users-table-container">

          <table className="users-table">

            <thead>

              <tr>

                <th>
                  #
                </th>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Role
                </th>

                <th>
                  Status
                </th>

                <th>
                  Joined
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredUsers.length > 0 ? (

                filteredUsers.map(
                  (user, index) => (

                    <tr key={user._id}>

                      {/* NUMBER */}

                      <td>
                        {index + 1}
                      </td>


                      {/* NAME */}

                      <td>

                        <div className="user-info">

                          <div className="user-avatar">

                            {user.name
                              ?.charAt(0)
                              .toUpperCase()}

                          </div>

                          <span>
                            {user.name}
                          </span>

                        </div>

                      </td>


                      {/* EMAIL */}

                      <td>
                        {user.email}
                      </td>


                      {/* ROLE */}

                      <td>

                        <span
                          className={`role ${
                            user.role === "admin"
                              ? "admin-role"
                              : "user-role"
                          }`}
                        >

                          {user.role}

                        </span>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`status ${
                            user.isBlocked
                              ? "blocked"
                              : "active"
                          }`}
                        >

                          {user.isBlocked
                            ? "Blocked"
                            : "Active"}

                        </span>

                      </td>


                      {/* JOINED */}

                      <td>

                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString()
                          : "-"}

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="actions">


                          {user.role !== "admin" && (

                            <button
                              className={
                                user.isBlocked
                                  ? "unblock-btn"
                                  : "block-btn"
                              }
                              onClick={() =>
                                handleBlock(
                                  user._id,
                                  user.isBlocked
                                )
                              }
                            >

                              {user.isBlocked
                                ? "Unblock"
                                : "Block"}

                            </button>

                          )}


                          {user.role !== "admin" && (

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(
                                  user._id
                                )
                              }
                            >

                              Delete

                            </button>

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="no-users"
                  >

                    No users found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};


export default AdminUsers;