import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import AddOrderForm from '../components/AddOrderForm';
import { ToastContainer } from 'react-toastify';

export default function AddOrderPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a delay to show the card after a certain time (for demonstration)
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <NavBar />
      <br />
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Card style={{
          width: '500px',
          height: '500px',
          border: '2px solid #343a40',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }} bg="dark" text="white">
          <Card.Body>
            <AddOrderForm />
            <ToastContainer/>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
