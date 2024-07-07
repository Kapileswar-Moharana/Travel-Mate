import { useState } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const Userlist = () => {
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch(`${BASE_URL}/users/`);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);

  const initialNewUserData = {
    username: "",
    email: "",
    password: "",
    role: "user",
  };

  const [newUserData, setNewUserData] = useState(initialNewUserData);
  const currentUserData = JSON.parse(localStorage.getItem("user"));
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const toggleModal = (user) => {
    setSelectedUser(user);
    setModalOpen(!modalOpen);
  };

  const toggleNewUserModal = () => {
    setNewUserModalOpen(!newUserModalOpen);

    if (newUserModalOpen) {
      setNewUserData(initialNewUserData);
    }
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  //update user role
  const updateUserRole = async (newRole) => {
    try {
      const updatedUser = { ...selectedUser, role: newRole };
      const token = Cookies.get("accessToken");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.put(
        `${BASE_URL}/users/${selectedUser._id}`,
        updatedUser,
        { withCredentials: true, headers }
      );
      if (response.status === 200) {
        console.log(
          "User role updated successfully:",
          updatedUser._id,
          newRole
        );
        setModalOpen(false);
        refetch();
      } else {
        console.error("Failed to update user role:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user role:", error.message);
    }
  };

  //new user input
  const submitNewUser = async () => {
    try {
      const token = Cookies.get("accessToken");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `${BASE_URL}/admin/createuser`,
        newUserData,
        {
          withCredentials: true,
          headers,
        }
      );
      if (response.status === 200) {
        console.log("New user added successfully:", response.data);
        refetch();
        setNewUserModalOpen(false);
        setNewUserData(initialNewUserData);
      }
    } catch (error) {
      console.error(
        "Error adding new user:",
        error.response?.data?.message || error.message
      );
    }
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen((prev) => !prev);
  };

  const confirmDelete = (userId) => {
    setUserIdToDelete(userId);
    setDeleteModalOpen(true);
  };

  const deleteUser = async () => {
    if (!userIdToDelete) return;

    try {
      const token = Cookies.get("accessToken");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.delete(
        `${BASE_URL}/users/${userIdToDelete}`,
        {
          withCredentials: true,
          headers,
        }
      );

      if (response.status === 200) {
        console.log("User deleted successfully:", userIdToDelete);
        refetch();
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  return (
    <section className="py-5">
      <Container>
        {loading && <h4 className="text-center">Loading...</h4>}
        {error && <h4 className="text-center text-danger">{error}</h4>}
        {!loading && !error && (
          <>
            <Button
              color="primary"
              onClick={toggleNewUserModal}
              className="mb-3"
            >
              Add New User
            </Button>
            <ul className="list-group">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>{user.username}</h5>
                    <p className="mb-0">{user.email}</p>
                  </div>
                  <div>
                    {currentUserData._id === user._id ? (
                      <>
                        <Button color="info" className="me-2">
                          {user.role}
                        </Button>
                        <Button color="warning" className="me-2" disabled>
                          Edit
                        </Button>
                        <Button color="danger" disabled>
                          Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button color="info" className="me-2">
                          {user.role}
                        </Button>
                        <Button
                          color="warning"
                          className="me-2"
                          onClick={() => toggleModal(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => confirmDelete(user._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Modal isOpen={modalOpen} toggle={() => toggleModal(selectedUser)}>
              <ModalHeader toggle={() => toggleModal(selectedUser)}>
                Edit User Role
              </ModalHeader>
              <ModalBody>
                {selectedUser && (
                  <div>
                    <h3 className="text-center">{selectedUser.username}</h3>
                    <label htmlFor="role">Select Role:</label>
                    <select
                      id="role"
                      className="form-select"
                      value={selectedUser.role}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => updateUserRole(selectedUser.role)}
                >
                  Save Changes
                </Button>{" "}
                <Button
                  color="secondary"
                  onClick={() => toggleModal(selectedUser)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={newUserModalOpen} toggle={toggleNewUserModal}>
              <ModalHeader toggle={toggleNewUserModal}>
                Add New User
              </ModalHeader>
              <ModalBody>
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={newUserData.username}
                      onChange={handleNewUserChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={newUserData.email}
                      onChange={handleNewUserChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={newUserData.password}
                      onChange={handleNewUserChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={newUserData.role}
                      onChange={handleNewUserChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={submitNewUser}>
                  Create User
                </Button>{" "}
                <Button color="secondary" onClick={toggleNewUserModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
              <ModalHeader toggle={toggleDeleteModal}>
                Confirm Delete
              </ModalHeader>
              <ModalBody>Are you sure you want to delete this user?</ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={deleteUser}>
                  Delete
                </Button>
                <Button color="secondary" onClick={toggleDeleteModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </>
        )}
      </Container>
    </section>
  );
};

export default Userlist;
