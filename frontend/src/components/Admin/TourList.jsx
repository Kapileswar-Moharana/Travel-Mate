/* eslint-disable react/no-unescaped-entities */
import { useState, useCallback } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const Tourlist = () => {
  const {
    data: tours,
    loading,
    error,
    refetch,
  } = useFetch(`${BASE_URL}/admin/tourlist`);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedTourForDelete, setSelectedTourForDelete] = useState(null);
  const [imageBase64String, setImageBase64String] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (loadEvent) {
        setImageBase64String(loadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditModal = () => setEditModalOpen(!editModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);
  const toggleAddModal = () => setAddModalOpen(!addModalOpen);

  const handleEditClick = useCallback((tour) => {
    setSelectedTour(tour);
    toggleEditModal();
  }, []);

  const handleDeleteClick = useCallback((tour) => {
    setSelectedTourForDelete(tour);
    toggleDeleteModal();
  }, []);

  const handleDeleteTour = async () => {
    try {
      const token = Cookies.get("accessToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        `${BASE_URL}/admin/${selectedTourForDelete._id}`,
        { withCredentials: true, headers }
      );
      if (response.status === 200) {
        console.log("Tour deleted successfully:", response.data);
        refetch();
        toggleDeleteModal();
      }
    } catch (error) {
      console.error(
        "Error deleting tour:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleEditTour = async (e) => {
    e.preventDefault();
    const updatedTour = {
      title: e.target.title.value,
      city: e.target.city.value,
      address: e.target.address.value,
      distance: parseFloat(e.target.distance.value),
      photo: imageBase64String, // Use the base64 string from the state
      desc: e.target.desc.value,
      price: parseFloat(e.target.price.value),
      maxGroupSize: parseInt(e.target.maxGroupSize.value),
      featured: e.target.featured.checked,
    };
    try {
      const token = Cookies.get("accessToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.put(
        `${BASE_URL}/admin/${selectedTour._id}`,
        updatedTour,
        { withCredentials: true, headers }
      );
      if (response.status === 200) {
        console.log("Tour updated successfully:", response.data);
        refetch();
        toggleEditModal();
        setImageBase64String(""); // Reset the image state
      }
    } catch (error) {
      console.error(
        "Error updating tour:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleAddTour = async (e) => {
    e.preventDefault();
    const newTourData = {
      title: e.target.title.value,
      city: e.target.city.value,
      address: e.target.address.value,
      distance: parseFloat(e.target.distance.value),
      photo: imageBase64String, // Use the base64 string from the state
      desc: e.target.desc.value,
      price: parseFloat(e.target.price.value),
      maxGroupSize: parseInt(e.target.maxGroupSize.value),
      featured: e.target.featured.checked,
    };
    try {
      const token = Cookies.get("accessToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${BASE_URL}/admin/createtour`,
        newTourData,
        { withCredentials: true, headers }
      );
      if (response.status === 200) {
        console.log("Tour added successfully:", response.data);
        refetch();
        toggleAddModal();
        setImageBase64String(""); // Reset the image state
      }
    } catch (error) {
      console.error(
        "Error adding tour:",
        error.response?.data?.message || error.message
      );
    }
  };

  const renderModalBody = (isEdit = false) => (
    <Form onSubmit={isEdit ? handleEditTour : handleAddTour}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={isEdit ? selectedTour.title : ""}
        />
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input
          type="text"
          name="city"
          id="city"
          required
          defaultValue={isEdit ? selectedTour.city : ""}
        />
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input
          type="text"
          name="address"
          id="address"
          required
          defaultValue={isEdit ? selectedTour.address : ""}
        />
      </FormGroup>
      <FormGroup>
        <Label for="distance">Distance</Label>
        <Input
          type="number"
          name="distance"
          id="distance"
          required
          defaultValue={isEdit ? selectedTour.distance : ""}
        />
      </FormGroup>
      <FormGroup>
        <Label for="photo">Photo URL</Label>
        <Input
          type="file"
          name="photo"
          id="photo"
          onChange={handleImageChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="desc">Description</Label>
        <Input
          type="textarea"
          name="desc"
          id="desc"
          required
          defaultValue={isEdit ? selectedTour.desc : ""}
        />
      </FormGroup>
      <FormGroup>
        <Label for="price">Price</Label>
        <Input
          type="number"
          name="price"
          id="price"
          required
          defaultValue={isEdit ? selectedTour.price : ""}
        />
      </FormGroup>
      <FormGroup>
        <Label for="maxGroupSize">Max Group Size</Label>
        <Input
          type="number"
          name="maxGroupSize"
          id="maxGroupSize"
          required
          defaultValue={isEdit ? selectedTour.maxGroupSize : ""}
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="featured"
            id="featured"
            defaultChecked={isEdit && selectedTour.featured}
          />{" "}
          Featured?
        </Label>
      </FormGroup>
      <ModalFooter>
        <Button type="submit" color="primary">
          {isEdit ? "Save Changes" : "Add Tour"}
        </Button>
        <Button
          color="secondary"
          onClick={isEdit ? toggleEditModal : toggleAddModal}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Form>
  );

  return (
    <section className="py-5">
      <Container>
        {loading && <h4 className="text-center">Loading...</h4>}
        {error && <h4 className="text-center text-danger">{error}</h4>}
        {!loading && !error && (
          <>
            <Button color="primary" className="mb-3" onClick={toggleAddModal}>
              Add New Tour
            </Button>
            <ListGroup>
              {tours.map((tour) => (
                <ListGroupItem
                  key={tour._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div style={{ flex: 1, marginRight: "10px" }}>
                    <h5>{tour.title}</h5>
                    <p className="mb-0">{tour.city}</p>
                  </div>
                  <div style={{ minWidth: "100px", textAlign: "center" }}>
                    <img
                      src={tour.photo}
                      alt={tour.title}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </div>
                  <div style={{ flex: 1, textAlign: "right" }}>
                    {tour.featured && (
                      <Button
                        color="success"
                        size="sm"
                        className="me-2"
                        disabled
                      >
                        Featured
                      </Button>
                    )}
                    <Button
                      color="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditClick(tour)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(tour)}
                    >
                      Delete
                    </Button>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
            <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
              <ModalHeader toggle={toggleEditModal}>
                Edit Tour Details
              </ModalHeader>
              <ModalBody>{selectedTour && renderModalBody(true)}</ModalBody>
            </Modal>
            <Modal isOpen={addModalOpen} toggle={toggleAddModal}>
              <ModalHeader toggle={toggleAddModal}>Add New Tour</ModalHeader>
              <ModalBody>{renderModalBody()}</ModalBody>
            </Modal>
            <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
              <ModalBody>
                Are you sure you want to delete the tour "
                {selectedTourForDelete?.title}"?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={handleDeleteTour}>
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

export default Tourlist;
