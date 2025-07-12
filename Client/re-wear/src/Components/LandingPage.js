import React from "react";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Navbar,
  Carousel,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

function LandingPage() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const handleCardClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

  return (
    <div>
      {/* Navbar */}
      <Navbar
        bg="light"
        expand="lg"
        className="px-4 shadow-sm d-flex justify-content-between"
      >
        <Navbar.Brand href="#">Re-Wear</Navbar.Brand>
        <div
          onClick={handleProfileClick}
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        >
          👤
        </div>
      </Navbar>

      {/* Images Section */}
      <Container className="mt-4">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src={image1}
              alt="First slide"
              style={{ height: "250px", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src={image2}
              alt="Second slide"
              style={{ height: "250px", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src={image3}
              alt="Third slide"
              style={{ height: "250px", objectFit: "cover" }}
            />
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Categories Section */}
      <Container className="mt-5">
        <h5 className="mb-3">Categories Section</h5>
        <Row className="g-3">
          {[...Array(6)].map((_, idx) => (
            <Col xs={6} md={4} key={idx}>
              <div className="bg-light border rounded py-4 text-center">
                Category {idx + 1}
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Product Listings */}
      <Container className="mt-5 mb-4">
        <h5 className="mb-3">Product Listings</h5>
        <Row className="g-4">
          {[...Array(4)].map((_, idx) => (
            <Col xs={12} md={3} key={idx}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={`https://via.placeholder.com/200x150.png?text=Product+${idx + 1}`}
                  alt={`Product ${idx + 1}`}
                  onClick={() =>
                    handleCardClick(`https://via.placeholder.com/600x400.png?text=Product+${idx + 1}`)
                  }
                  style={{ cursor: 'pointer' }}
                />
                <Card.Body className="text-center">
                  <Card.Title>Product {idx + 1}</Card.Title>
                  <Card.Text>Click to view larger image.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal for Image Preview */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Product Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={selectedImage} alt="Selected" className="img-fluid rounded" />
          <p>Review</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LandingPage;
