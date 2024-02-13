import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavBar() {
    // handle logout
    const handleLogout = async () => {
        try {
            const response = await fetch('https://voosh-assignment-backend-tynu.onrender.com/user/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Include cookies in the request
            });

            if (response.ok) {
                localStorage.removeItem('token');
                toast.success('Logout successful');
                window.location.reload();
            } else {
                toast.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout error');
        }
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Voosh-Assignment</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/add-order" className="nav-link">Add Order</Link>
                        <Link to="/get-orders" className="nav-link">View Orders</Link>
                    </Nav>
                    <Nav className="gap-2">
                        <Link to="/user-data" className="nav-link">User Info</Link>
                        <Button variant='light' onClick={handleLogout}>Logout</Button>{' '}
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <ToastContainer />
        </>
    );
}

export default NavBar;
