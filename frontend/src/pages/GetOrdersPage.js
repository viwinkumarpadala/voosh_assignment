import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { Table, Button, Spinner } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify

export default function GetOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      localStorage.removeItem('token');
      window.location.reload();
    } finally {
      // Ensure that setLoading is always called to set loading state
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (userData) {
      fetchOrders();
    }
  }, [userData]);

  const fetchOrders = async () => {
    try {
      setLoading(true); // Set loading to true when fetching orders
      const response = await axios.get('http://localhost:5000/order/get-order', {
        params: { userId: userData.userId },
        withCredentials: true
      });
      setOrders(response.data.orders);
    } catch (error) {
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Unauthorized: Missing token' || errorMessage === 'Unauthorized: Invalid token') {
        localStorage.removeItem('token');
        window.location.reload();
      } else {
        toast.error(errorMessage, { autoClose: 1000 });
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
      await axios.delete(`http://localhost:5000/order/delete/${orderId}`, { withCredentials: true });

      // Update the orders state by filtering out the deleted order
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));

      // Show success toast notification
      toast.success('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      const errorMessage = error.response.data.message;
      if (errorMessage === 'Unauthorized: Missing token' || errorMessage === 'Unauthorized: Invalid token') {
        localStorage.removeItem('token');
        window.location.reload();
      } else {
        toast.error(errorMessage, { autoClose: 1000 });
      }
    }
  };

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
      <ToastContainer />
    </div>
  );
}
