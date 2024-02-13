import React from 'react';
import NavBarLogin from '../components/NavBarlogin';
import SignUpForm from '../components/SignUpForm';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

export default function SignupPage() {
  // Use usestate hook to handle the state
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set a delay to show the card after a certain time 
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
   // return the function
  return (
    <div>
      <NavBarLogin />
      <br/>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Card style={{
          width: '500px',
          height: '500px',
          border: '2px solid #343a40',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }} bg="dark" text="white">
          <Card.Body>
            <SignUpForm />
            <ToastContainer/>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
