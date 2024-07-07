import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/gallery.css";

const images = [
  "/tour-images/tour-img01.jpg",
  "/tour-images/tour-img02.jpg",
  "/tour-images/tour-img03.jpg",
  "/tour-images/tour-img04.jpg",
  "/tour-images/tour-img05.jpg",
  "/tour-images/tour-img06.jpg",
  "/tour-images/tour-img07.jpg",
];

const Gallery = () => {
  return (
    <Container>
      <Row className="mt-4">
        {images.map((image, index) => (
          <Col md="4" sm="6" xs="12" key={index} className="mb-4">
            <div className="gallery-item ">
              <Link to="/tours">
                <img
                  src={image}
                  alt={`tour-img-${index}`}
                  className="img-fluid"
                />

                <div className="overlay">
                  <div className="text">Book Now</div>
                </div>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
