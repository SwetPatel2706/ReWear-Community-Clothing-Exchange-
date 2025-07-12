import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Button, Modal, Form } from 'react-bootstrap';

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [newListing, setNewListing] = useState({
    image: null,
    size: '',
    condition: '',
    price: ''
  });
  const [preview, setPreview] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setNewListing({ image: null, size: '', condition: '', price: '' });
    setPreview(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      setNewListing({ ...newListing, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setNewListing({ ...newListing, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the listing logic (e.g., send to backend)
    handleClose();
  };

  return (
    <Container className="my-5">
      {/* Profile Info Section */}
      <Card className="p-4 shadow-sm mb-5">
        <Row className="align-items-center">
          <Col md={3} className="text-center mb-3 mb-md-0">
            <Image
              src="https://via.placeholder.com/120"
              roundedCircle
              alt="Profile"
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={9}>
            <Row className="g-2">
              {[...Array(6)].map((_, idx) => (
                <Col md={4} key={idx}>
                  <Card className="text-center p-2 bg-light border">
                    <small>User Info {idx + 1}</small>
                  </Card>
                </Col>
              ))}
              <Col md={12}>
                <Card className="mt-3 bg-light border p-3">
                  <p className="mb-0">
                    Hi, I’m a user of this platform. This is the about me section or bio where you can
                    add description, contact, or any other useful detail.
                  </p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* My Listings */}
      <div className="d-flex align-items-center mb-3">
        <h5 className="mb-0 me-2">My Listings</h5>
        <Button variant="primary" size="sm" onClick={handleShow} className="ms-auto">Post More!</Button>
      </div>
      <Row className="g-4 mb-5">
        {[...Array(4)].map((_, idx) => (
          <Col xs={12} md={3} key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/200x150"
                alt={`Listing ${idx + 1}`}
              />
              <Card.Body>
                <Card.Title>Listing {idx + 1}</Card.Title>
                <Card.Text>Short description of the product.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Listing Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>List a Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} required />
              {preview && <img src={preview} alt="Preview" className="img-fluid mt-2 rounded" style={{ maxHeight: 150 }} />}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Size</Form.Label>
              <Form.Control type="text" name="size" value={newListing.size} onChange={handleChange} placeholder="e.g. M, L, 32, etc." required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Condition</Form.Label>
              <Form.Control type="text" name="condition" value={newListing.condition} onChange={handleChange} placeholder="e.g. Gently used, Like new" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={newListing.price} onChange={handleChange} placeholder="Enter price" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              List Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* My Purchases */}
      <h5 className="mb-3">My Purchases</h5>
      <Row className="g-4">
        {[...Array(3)].map((_, idx) => (
          <Col xs={12} md={4} key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/200x150"
                alt={`Purchase ${idx + 1}`}
              />
              <Card.Body>
                <Card.Title>Purchase {idx + 1}</Card.Title>
                <Card.Text>Summary of your past purchase.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProfilePage;