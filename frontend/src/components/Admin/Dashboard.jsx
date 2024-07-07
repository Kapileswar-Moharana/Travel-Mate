import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Row, Col } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    tourCount: 0,
    bookingsThisMonth: 0,
    revenueThisMonth: 0,
    newUsersThisMonth: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = Cookies.get("accessToken");
        const headers = { Authorization: `Bearer ${token}` };

        const [userStats, tourStats, bookingStats, revenueStats] =
          await Promise.all([
            axios.get(`${BASE_URL}/admin/userstats`, {
              withCredentials: true,
              headers,
            }),
            axios.get(`${BASE_URL}/admin/tourstats`, {
              withCredentials: true,
              headers,
            }),
            axios.get(`${BASE_URL}/admin/bookingstats`, {
              withCredentials: true,
              headers,
            }),
            axios.get(`${BASE_URL}/admin/revenuestats`, {
              withCredentials: true,
              headers,
            }),
          ]);

        setStats({
          userCount: userStats.data.data.userCount,
          tourCount: tourStats.data.data,
          bookingsThisMonth: bookingStats.data.data,
          revenueThisMonth: revenueStats.data.data,
          newUsersThisMonth: userStats.data.data.monthlyNewUsers,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <Row className="mt-4">
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Total Users</CardTitle>
              <CardText>{stats.userCount}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Total Tours</CardTitle>
              <CardText>{stats.tourCount}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Bookings This Month</CardTitle>
              <CardText>{stats.bookingsThisMonth}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="6">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Revenue This Month</CardTitle>
              <CardText>${stats.revenueThisMonth}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card>
            <CardBody>
              <CardTitle tag="h5">New Users This Month</CardTitle>
              <CardText>{stats.newUsersThisMonth}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
