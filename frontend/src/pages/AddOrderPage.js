import React from 'react'
import NavBar from '../components/NavBar'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import AddOrderForm from '../components/AddOrderForm';

export default function AddOrderOage() {
  return (
    <div>
      <NavBar/>
      <br /><br />
      <Container className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '400px', height: '500px', border: '2px solid #343a40' }} bg="dark" text="white">
          <Card.Body>
            <AddOrderForm/>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
