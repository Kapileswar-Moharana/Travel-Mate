import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import TourList from "../components/Admin/TourList";
import UserList from "../components/Admin/UserList";
import BookingList from "../components/Admin/BookingList";
import Dashboard from "../components/Admin/Dashboard";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm="2" className="mt-4">
          <Nav vertical>
            <NavItem>
              <NavLink
                style={
                  activeTab === "dashboard"
                    ? { ...styles.navLink, ...styles.activeNavLink }
                    : styles.navLink
                }
                onClick={() => toggleTab("dashboard")}
              >
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={
                  activeTab === "userManagement"
                    ? { ...styles.navLink, ...styles.activeNavLink }
                    : styles.navLink
                }
                onClick={() => toggleTab("userManagement")}
              >
                User Management
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={
                  activeTab === "contentManagement"
                    ? { ...styles.navLink, ...styles.activeNavLink }
                    : styles.navLink
                }
                onClick={() => toggleTab("contentManagement")}
              >
                Tour Management
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={
                  activeTab === "bookingManagement"
                    ? { ...styles.navLink, ...styles.activeNavLink }
                    : styles.navLink
                }
                onClick={() => toggleTab("bookingManagement")}
              >
                Booking Management
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col sm="9">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="dashboard">
              <h1 className="text-center mt-3">Dashboard</h1>
              <Dashboard />
            </TabPane>
            <TabPane tabId="userManagement">
              <h1 className="text-center mt-3">User List</h1>
              <UserList />
            </TabPane>
            <TabPane tabId="contentManagement">
              <h1 className="text-center mt-3">Tour List</h1>
              <TourList />
            </TabPane>
            <TabPane tabId="bookingManagement">
              <h1 className="text-center mt-3">Booking List</h1>
              <BookingList />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  navLink: {
    color: "#333",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "5px",
    backgroundColor: "whitesmoke",
    display: "inline-block",
    width: "100%",
    textAlign: "center",
    border: "1px solid transparent",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#ddd",
    },
  },
  activeNavLink: {
    backgroundColor: "#faa935",
  },
};

export default AdminPage;
