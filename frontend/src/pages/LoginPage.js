import React from 'react'
import NavBarlogin from '../components/NavBarlogin'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import LoginForm from '../components/LoginForm';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

export default function LoginPage() {
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
      <NavBarlogin />
      <br />
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Card style={{
          width: '500px',
          height: '500px',
          border: '2px solid #343a40',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }} bg="dark" text="white"><Card.Body>
            <LoginForm/>
            <ToastContainer/>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
