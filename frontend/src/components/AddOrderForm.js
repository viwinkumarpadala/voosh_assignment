import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddOrderForm() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const handlePhoneNumberChange = (event) => {
        const { value } = event.target;
        setPhoneNumber(value);

        // Validate phone number using regex
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
            setPhoneNumberError('Please enter a valid 10-digit phone number');
        } else {
            setPhoneNumberError('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h1>Add New Order</h1><br />
                <Form.Group className="mb-3" controlId="formBasicname">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="text" placeholder="User ID" readOnly required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSubtotal">
                    <Form.Label>Sub Total</Form.Label>
                    <Form.Control type="number" placeholder="Enter Sub Total" step="any" required />
                    <Form.Text className="text-muted">
                        We'll never share your details with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                    />
                    {phoneNumberError && (
                        <Form.Text className="text-danger">
                            {phoneNumberError}
                        </Form.Text>
                    )}
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Add Order
                </Button>
            </Form>
        </div>
    );
}
