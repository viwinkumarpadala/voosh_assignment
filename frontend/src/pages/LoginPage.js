import React from 'react'
import NavBarlogin from '../components/NavBarlogin'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <NavBarlogin />
      <br /><br />
      <Container className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '400px', height: '500px', border: '2px solid #343a40' }} bg="dark" text="white">
          <Card.Body>
            <LoginForm/>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
