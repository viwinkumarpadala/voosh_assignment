import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/login-user', formData, { withCredentials: true });
            const { message, Token } = response.data;
            console.log(response.data)
            toast.success(message);
            if (response.data.Token) {
                
                localStorage.setItem('token',Token)
                window.location.reload()
                console.log(localStorage.getItem('token'));
            }
        } catch (error) {
            console.error(error.response.data);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h1>Login</h1><br />
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                        onChange={handleChange}
                        required
                    />
                    <Form.Text className="text-muted">
                        We'll never share your details with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <br />
                <Button variant="secondary" type="submit">
                    Login
                </Button>
                <br />
                <br />
                <div className="text-center">
                    <Link to="/"><u>You don't have an account? Signup</u></Link>
                </div>
                <ToastContainer />
            </Form>
        </div>
    );
}
