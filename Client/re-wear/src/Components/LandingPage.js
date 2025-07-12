import React, { useState, useEffect } from "react";
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
  const [selectedImage, setSelectedImage] = useState("");
  const handleCardClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // Cart state
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add to cart handler
  const handleAddToCart = () => {
    // For demo, use selectedImage as product image and a dummy title
    const product = {
      image: selectedImage,
      title: selectedImage.split('=')[1] || 'Product',
    };
    setCart([...cart, product]);
    setShowModal(false);
  };

  // Categories array
  const categories = [
    "Men's Clothing",
    "Women's Clothing",
    "Kids",
    "Traditional wear",
    "Footwear",
    "Winter Wear"
  ];

  // Product images array for listings
  const productImages = [image1, image2, image3, image1];

  return (
    <div>
      {/* Navbar */}
      <Navbar
        bg="light"
        expand="lg"
        className="px-4 shadow-sm d-flex justify-content-between"
      >
        <Navbar.Brand href="#">Re-Wear</Navbar.Brand>
        <div className="d-flex align-items-center">
          <Button
            variant="outline-primary"
            size="sm"
            className="me-3"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </Button>
          <div
            onClick={handleProfileClick}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          >
            👤
          </div>
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
          {categories.map((cat, idx) => (
            <Col xs={6} md={4} key={idx}>
              <div className="bg-light border rounded py-4 text-center">
                {cat}
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Product Listings */}
      <Container className="mt-5 mb-4">
        <h5 className="mb-3">Product Listings</h5>
        <Row className="g-4">
          {productImages.map((img, idx) => (
            <Col xs={12} md={3} key={idx}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={img}
                  alt={`Product ${idx + 1}`}
                  onClick={() => handleCardClick(img)}
                  style={{ cursor: "pointer" }}
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
          <Button variant="success" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default LandingPage;