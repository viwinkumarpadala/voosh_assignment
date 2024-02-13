import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddOrderForm() {
    // Use usestate hook to handle the state
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [userData, setUserData] = useState(null);
    // get the user data from jwt token
    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setUserData(decoded);
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            toast.error('Invalid token');
            // Clear local storage
            localStorage.removeItem('token');
            window.location.reload();
        }
    }, []);
    // phone number validate
    const handlePhoneNumberChange = (event) => {
        const { value } = event.target;
        setPhoneNumber(value);

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
            setPhoneNumberError('Please enter a valid 10-digit phone number');
        } else {
            setPhoneNumberError('');
        }
    };
    // handle submit
    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const phoneNumberPattern = /^\d{10}$/;
            if (!phoneNumberPattern.test(event.target.phoneNumber.value)) {
                toast.error('Please enter a valid 10-digit phone number');
                return;
            }

            const response = await axios.post('https://voosh-assignment-backend-tynu.onrender.com/order/add-order', {
                subTotal: event.target.subTotal.value,
                phoneNumber: event.target.phoneNumber.value,
                userId: userData.userId
            }, {
                withCredentials: true
            });

            toast.success(response.data.message, { autoClose: 1000 });
            setPhoneNumber('');
            setPhoneNumberError('');
            event.target.reset();
        } catch (error) {
            console.error(error.response.data);
            const errorMessage = error.response.data.message;
            if (errorMessage === 'Unauthorized: Missing token' || errorMessage === 'Unauthorized: Invalid token') {
                localStorage.removeItem('token');
                window.location.reload();
            } else {
                toast.error(errorMessage, { autoClose: 1000 });
            }
            toast.error(error.response.data.message, { autoClose: 1000 });
        }
    };

 
    if (!userData) {
        return <div>Loading...</div>;
    }
    // return the function
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h1>Add New Order</h1><br />
                <Form.Group className="mb-3" controlId="formBasicname">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="text" placeholder={userData.userId} name="userId" readOnly required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSubtotal">
                    <Form.Label>Sub Total*</Form.Label>
                    <Form.Control type="number" placeholder="Enter Sub Total" step="any" name="subTotal" required />
                    <Form.Text className="text-muted">
                        We'll never share your details with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Label>Phone Number*</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        name="phoneNumber"
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
                <ToastContainer />
            </Form>
        </div>
    );
}
