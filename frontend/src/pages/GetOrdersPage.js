import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { Table, Button, Spinner } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
 

export default function GetOrdersPage() {
  // Use usestate hook to handle the state
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Get the userdata using the token
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      window.location.reload();
    } finally {
      // Ensure that setLoading is always called to set loading state
      setLoading(false);
    }
  }, []);

  // fetching orders
  useEffect(() => {
    if (userData) {
      fetchOrders();
    }
  }, [userData]);
 
  const fetchOrders = async () => {
    try {
      setLoading(true); // Set loading to true when fetching orders
      const response = await axios.get('https://voosh-assignment-backend-tynu.onrender.com/order/get-order', {
        params: { userId: userData.userId },
        withCredentials: true
      });
      setOrders(response.data.orders);
    } catch (error) {
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Unauthorized: Missing token' || errorMessage === 'Unauthorized: Invalid token') {
        // if access is unauthorized or invalid then clear the token and reload the page, so it will go to /
        localStorage.removeItem('token');
        window.location.reload();
      } else {
        console.error(error);
      }
      console.error(error);
    } finally {
      // Ensure that setLoading is always called to set loading state
      setLoading(false); // Ensure loading is set to false even if there's an error
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      // Send a DELETE request to delete the order
      await axios.delete(`https://voosh-assignment-backend-tynu.onrender.com/order/delete/${orderId}`, { withCredentials: true });

      // Update the orders state by filtering out the deleted order
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));

     
     
    } catch (error) {
      console.error('Error deleting order:', error);
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Unauthorized: Missing token' || errorMessage === 'Unauthorized: Invalid token') {
        // if access is unauthorized or invalid then clear the token and reload the page, so it will go to /
        localStorage.removeItem('token');
        window.location.reload();
      } else {
        console.error(error);
      }
    }
  };
 // return the function
  return (
    <div>
      <NavBar />
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h2 style={{ fontSize: '35px', fontWeight: 'bold', textTransform: 'uppercase' }}>Orders</h2>
      </div>
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px' }}>
            <Spinner animation="border" role="status" variant="primary" style={{ width: '100px', height: '100px' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '36px' }}>No Orders Yet!</div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Subtotal</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.username}</td>
                      <td>{order.subtotal}</td>
                      <td>{order.phoneNumber}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDeleteOrder(order._id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </div>
      
    </div>
  );
}
