import React from 'react';
import { Container, Row, Col, Button, Card, Image, ButtonGroup } from 'react-bootstrap';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
  { id: 4, name: 'Bob Martin', email: 'bob@example.com', role: 'Admin' },
];

function AdminPanel() {
  return (
    <Container className="my-4">
      {/* Top Nav Buttons
      <div className="d-flex justify-content-center gap-3 mb-4">
        <Button variant="outline-primary">Manage Users</Button>
        <Button variant="outline-success">Manage Orders</Button>
        <Button variant="outline-warning">Manage Listings</Button>
      </div> */}

      <h4 className="mb-4 text-center">Manage Users</h4>

      {/* User Cards */}
      {users.map((user) => (
        <Card key={user.id} className="mb-3 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              {/* Profile Picture */}
              <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
                <Image
                  src="https://via.placeholder.com/80"
                  roundedCircle
                  alt="User"
                  style={{ width: '80px', height: '80px' }}
                />
              </Col>

              {/* User Details */}
              <Col xs={12} md={7}>
                <h5 className="mb-1">{user.name}</h5>
                <p className="mb-1">{user.email}</p>
                <span className="badge bg-secondary">{user.role}</span>
              </Col>

              {/* Actions */}
              <Col xs={12} md={3} className="text-md-end mt-3 mt-md-0">
                <ButtonGroup vertical>
                  <Button variant="danger" size="sm">
                    Block User
                  </Button>
                  <Button variant="outline-danger" size="sm" className="mt-2">
                    Delete User
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default AdminPanel;
