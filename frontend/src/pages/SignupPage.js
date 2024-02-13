import React from 'react';
import NavBarLogin from '../components/NavBarlogin';
import SignUpForm from '../components/SignUpForm';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export default function SignupPage() {
  return (
    <div>
      <NavBarLogin />
      <br/><br/>
      <Container className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '400px', height: '500px', border: '2px solid #343a40' }} bg="dark" text="white">
          <Card.Body>
            <SignUpForm />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
