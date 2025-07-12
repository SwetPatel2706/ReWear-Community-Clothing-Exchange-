import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import jsPDF from "jspdf";

function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    setCart(saved ? JSON.parse(saved) : []);
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Summary Receipt", 10, 15);
    doc.setFontSize(12);
    let y = 30;
    cart.forEach((item, idx) => {
      doc.text(`Product ${idx + 1}: ${item.title || "Product"}`, 10, y);
      y += 8;
    });
    doc.text("Thank you for your order! Please pay on delivery.", 10, y + 10);
    doc.save("order-summary.pdf");
  };

  const handlePayOnDelivery = () => {
    alert("Order placed! You can pay on delivery.");
    generatePDF();
    localStorage.removeItem('cart');
    setCart([]);
  };

  return (
    <Container className="my-5">
      <h3 className="mb-4">Checkout</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Row className="g-4">
            {cart.map((item, idx) => (
              <Col xs={12} md={4} key={idx}>
                <Card>
                  <Card.Img variant="top" src={item.image} alt={item.title} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="mt-4 text-center">
            <Button variant="success" size="lg" onClick={handlePayOnDelivery}>
              Pay on Delivery
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Checkout;