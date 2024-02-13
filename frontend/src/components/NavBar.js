import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function NavBar() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">VooshAssignment</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Add-order</Nav.Link>
                        <Nav.Link href="#features">View-Orders</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#pricing">UserInfo</Nav.Link>
                        <Button variant="light">Logout</Button>{' '}
                    </Nav>
                </Container>
            </Navbar>
            <br />

        </>
    );
}

export default NavBar;