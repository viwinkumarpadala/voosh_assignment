import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Import axios for making HTTP requests

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
            const response = await axios.post('https://voosh-assignment-backend-8vg2.onrender.com/user/add-user', formData,{withCredentials:true});
            setMessage(response.data.message);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
            setMessage(error.response.data.message);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h1>Signup</h1><br />
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Label>PhoneNumber</Form.Label>
                    <Form.Control type="tel" name="phoneNumber" placeholder="Enter Phone Number" onChange={handleChange} required />
                    <Form.Text className="text-muted">
                        We'll never share your details with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    SignUp
                </Button>
                <br />
                <br />
                <div className="text-center">
                    <u><a>Already have an account? Login</a></u>
                </div>
                {message && <p>{message}</p>}
            </Form>
        </>
    );
}
