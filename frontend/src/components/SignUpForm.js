import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Import axios for making HTTP requests
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Phone number validation
            const phoneNumberPattern = /^\d{10}$/; // Regular expression for 10-digit phone number
            if (!phoneNumberPattern.test(formData.phoneNumber)) {
                // Show error message if phone number is invalid
                toast.error('Please enter a valid 10-digit phone number');
                return;
            }

            const response = await axios.post('http://localhost:5000/user/add-user', formData, { withCredentials: true });
            setMessage(response.data.message);
            console.log(response.data)

            if (response.data.Token) {
                localStorage.setItem('token', response.data.Token);
                window.location.reload();
            }
        } catch (error) {
            console.error(error.response.data);
            toast.error(error.response.data.message, { autoClose: 2000 }); 
        }
    };


    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h1>Signup</h1><br />
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Label>PhoneNumber*</Form.Label>
                    <Form.Control type="tel" name="phoneNumber" placeholder="Enter Phone Number" onChange={handleChange} required />
                    <Form.Text className="text-muted">
                        We'll never share your details with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter Password*</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    SignUp
                </Button>
                <br />
                <br />
                <div className="text-center">
                    <Link to="/login"><u>Already have an account? Login</u></Link>
                </div>
                {message && <p>{message}</p>}
            </Form>
        </>
    );
}
