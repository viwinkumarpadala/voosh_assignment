import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LoginForm() {
  return (
    <div>
          <Form>
              <h1>Login</h1><br />
              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="phonenumber" placeholder="Enter Phone Number" />
                  <Form.Text className="text-muted">
                      We'll never share your details with anyone else.
                  </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="secondary" type="submit">
                  Login
              </Button>
              <br />
              <br />
              <div className="text-center">
                  <u><a>You don't have an account? Signup</a></u>
              </div>
          </Form>
    </div>
  )
}
