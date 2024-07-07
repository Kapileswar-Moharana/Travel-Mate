import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Spinner,
  Container,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import Cookies from "js-cookie";

const BookingList = () => {
  const {
    data: bookings,
    loading,
    error,
    refetch,
  } = useFetch(`${BASE_URL}/booking`);
  const [open, setOpen] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggle = (id) => {
    setOpen((prevOpen) => (prevOpen === id ? "" : id));
  };

  const toggleDropdown = (id, event) => {
    event.stopPropagation();
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleStatusChange = async (id, newStatus, event) => {
    event.stopPropagation();
    try {
      const token = Cookies.get("accessToken");
      const headers = { Authorization: `Bearer ${token}` };
      console.log(`Updating status for booking ${id} to ${newStatus}`);
      const response = await axios.put(
        `${BASE_URL}/booking/${id}/status`,
        { status: newStatus },
        { withCredentials: true, headers }
      );
      console.log("Update response:", response.data);
      refetch();
    } catch (error) {
      console.error("Error updating booking status:", error.message);
    }
  };

  const handleDeleteBooking = async (id, event) => {
    event.stopPropagation();
    try {
      const token = Cookies.get("accessToken");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${BASE_URL}/booking/${id}`, {
        withCredentials: true,
        headers,
      });
      refetch();
    } catch (error) {
      console.error("Error deleting booking:", error.message);
    }
  };

  const statusColors = {
    pending: "warning",
    ongoing: "info",
    completed: "success",
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  if (loading) return <Spinner color="primary" />;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <section className="py-5">
      <Container>
        <Accordion open={open} toggle={toggle}>
          {bookings.map((booking) => (
            <AccordionItem key={booking._id}>
              <AccordionHeader targetId={booking._id}>
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <span>
                    {booking.fullName} - {booking.tourName}
                  </span>
                  <div className="d-flex align-items-center">
                    <Button
                      color={statusColors[booking.status]}
                      className="ms-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {booking.status}
                    </Button>
                    <Dropdown
                      isOpen={dropdownOpen[booking._id] || false}
                      toggle={(e) => toggleDropdown(booking._id, e)}
                      className="ms-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownToggle caret>Change Status</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={(e) =>
                            handleStatusChange(booking._id, "pending", e)
                          }
                        >
                          Pending
                        </DropdownItem>
                        <DropdownItem
                          onClick={(e) =>
                            handleStatusChange(booking._id, "ongoing", e)
                          }
                        >
                          Ongoing
                        </DropdownItem>
                        <DropdownItem
                          onClick={(e) =>
                            handleStatusChange(booking._id, "completed", e)
                          }
                        >
                          Completed
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Button
                      color="danger"
                      className="ms-3 me-3"
                      onClick={(e) => handleDeleteBooking(booking._id, e)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </AccordionHeader>
              <AccordionBody accordionId={booking._id}>
                <p>
                  <strong>User Email:</strong> {booking.userEmail}
                </p>
                <p>
                  <strong>Full Name:</strong> {booking.fullName}
                </p>
                <p>
                  <strong>Tour Name:</strong> {booking.tourName}
                </p>
                <p>
                  <strong>Guest Size:</strong> {booking.guestSize}
                </p>
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>
                <p>
                  <strong>Price:</strong> {booking.price}
                </p>
                <p>
                  <strong>Booking Date:</strong> {formatDate(booking.bookAt)}
                </p>
                <p>
                  <strong>Created At:</strong> {formatDate(booking.createdAt)}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};

export default BookingList;
